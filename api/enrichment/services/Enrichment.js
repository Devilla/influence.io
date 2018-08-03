'use strict';

/**
 * Enrichment.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const fetch = require('fetch').fetchUrl;
const gravatar = require('gravatar');

module.exports = {

  picasaWeb: async(email) => {
    return new Promise((resolve, reject) => {
      let URI = "http://picasaweb.google.com/data/entry/api/user/" + email.trim() + "?alt=json";
      fetch(URI,(error, meta, body) => {
        if (!error && meta.responseHeaders['content-type'] == 'application/json; charset=UTF-8') {
          try {
            let emailEnrichmentJSON = JSON.parse(body.toString());
            let returnJson = {
              username: emailEnrichmentJSON.entry.gphoto$nickname.$t,
              profile_pic: emailEnrichmentJSON.entry.gphoto$thumbnail.$t
            }
            resolve(returnJson)
          } catch (errorFromTry) {
            reject(errorFromTry)
          }
        } else {
          reject({error: body.toString()});
        }
      });
    });
  },

  gravatr: async(email) => {
    return new Promise((resolve, reject) => {
      let URI = gravatar.profile_url(email, { protcol: 'https' });
      fetch(URI,(error, meta, body) => {
        if (!error && meta.responseHeaders['content-type'] == 'application/json; charset=UTF-8') {
          try {
            let emailEnrichmentJSON = JSON.parse(body.toString());
            let entry = emailEnrichmentJSON.entry[0];
            let profile_pic = entry.photos[0].value;
            let username = entry.displayName;
            let returnJson = {
              username: username,
              profile_pic: profile_pic
            };
          } catch (errorForTry) {
            reject(errorForTry)
          }
        } else {
          reject({error: body?body.toString():body})
        }
      });
    });
  }
};
