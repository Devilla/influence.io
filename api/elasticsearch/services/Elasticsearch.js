'use strict';

/**
 * Elasticsearch.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.

const elasticsearch = require('elasticsearch');
const moment = require('moment');

const client = elasticsearch.Client({
  host: strapi.config.elasticsearchNode,
  log: 'trace',
});


module.exports = {


health : async () => {
    return new Promise((resolve, reject)=> {
      client.cluster.health({}, function (err,resp,status) {
        if(err) reject(err);
        else resolve(resp);
        strapi.log.info('-- Client Health --',resp);
      });

    });

  },


  query: async (index,q) => {
    return new Promise((resolve, reject)=> {
      client.search({index: index, q: q}, function (err,resp,status) {
        if (err) reject(err);
        else resolve(resp);
        strapi.log.info('---Client Search Returned--- ',resp);
      });
    });
  },

  notification: async (index, trackingId, type) => {
    var query;
    switch(type) {
      case 'live' :
      query = {
        index: index,
        q: `json.value.trackingId:${trackingId} AND @timestamp:[${moment().subtract(3, 'minutes').format()} TO ${moment().format()}]`
      }
        break;
      case 'identification' :
        query = {
          index: index,
          body: {
            query: {
              "bool": {
                "must": [
                  { "match": { "json.value.trackingId":  trackingId }},
                  { "terms": { "json.value.source.url.pathname": [ '/register', '/sign-up', '/signup' ]   }},
                  { "match": { "json.value.event": 'formsubmit' }}
                ]
              }
            }
          }
        };
        break;
      case 'journey' :
        query = {
          index: index,
          body: {
            query: {
              "bool": {
                "must": [
                  { "match": { "json.value.trackingId":  trackingId }},
                  { "terms": { "json.value.source.url.pathname": [ '/register', '/sign-up', '/signup' ]   }},
                  { "match": { "json.value.event": 'formsubmit' }}
                ]
              }
            },
            "sort" : [
              { "@timestamp" : {"order" : "desc", "mode" : "max"}}
            ],
            size: 1
          }
        };
        break;
      default:
        break;
    }



    const rule = await Campaign.findOne({trackingId: trackingId})
    .populate('rule')
    .exec()
    .then(result => result?result.rule:null);



    if(rule) {
      const response = await new Promise((resolve, reject) => {
        client.search(query, function (err, resp, status) {
          if (err) reject(err);
          else resolve(resp);
        });
      });

      if(type == 'journey') {
        let email = response.hits.hits[0]._source.json.value.form.email;
        try {
          userDetails = await strapi.services.enrichment.picasaWeb(email);
        } catch(err) {
          try {
            userDetails = await strapi.services.enrichment.gravatr(email);
          } catch(err) {
            userDetails = {
              username: email.replace(/@.*$/,"")
            };
          }
        }
      }

      return {response, rule, userDetails};
    } else {
      return {error: "Tracking Id not found"};
    }
  }

};
