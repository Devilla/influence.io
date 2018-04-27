'use strict';

/**
 * `Enrichment` service.
 */

const fetch = require('fetch').fetchUrl;
const gravatar = require('gravatar');

module.exports = {
  // exampleService: (arg1, arg2) => {
  //   return isUserOnline(arg1, arg2);
  // }


  picasaWeb: async(email) => {
    return new Promise((resolve, reject) => {
      let URI = "http://picasaweb.google.com/data/entry/api/user/" + email.trim() + "?alt=json";
      fetch(URI,(error, meta, body) => {
        if (!error){
          try {
            let emailEnrichmentJSON = JSON.parse(body.toString());
            let returnJson = {
              username: emailEnrichmentJSON.entry.gphoto$nickname.$t,
              profile_pic: emailEnrichmentJSON.entry.gphoto$thumbnail.$t
            }
            resolve(returnJson)
          }catch (errorFromTry){
            reject(errorFromTry)
          }
        } else {
          reject(error);
        }
      })
    })
  },

  gravatr: async(email) => {
    return new Promise((resolve, reject) => {
      let URI = gravatar.profile_url(email, { protcol: 'https' });
      fetch(URI,(error, meta, body) => {
        if (!error) {
          try {
            let emailEnrichmentJSON = JSON.parse(body.toString());
            let entry = emailEnrichmentJSON.entry[0];
            let profile_pic = entry.photos[0].value;
            let username = entry.displayName;
            let returnJson = {
              username: username,
              profile_pic: profile_pic
            };
          }catch (errorForTry) {
            reject(errorForTry)
          }
        }else {
          reject(error)
        }
      })
    })
  }

};
