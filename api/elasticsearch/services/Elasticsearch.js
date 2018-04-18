'use strict';

/**
 * Elasticsearch.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.

const elasticsearch = require('elasticsearch');


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
    let query;
    switch(type) {
      case 'live' :
        query = {
          "range" : {
            "timestamp" : {
                "gte": "now-5m",
                "lte": "now",
                "time_zone": "+01:00"
            }
          }
        };
        break;
      case 'identification' :
        query = null;
        break;
      case 'journey' :
        query = null;
        break;
      default:
        break;
    }

    const rule = await Campaign.findOne({trackingId: trackingId})
    .populate('rule')
    .exec()
    .then(result => result.rule);

    const response = await new Promise((resolve, reject)=> {
      client.search({
        index: index,
        body: {
          query: {
            "bool": {
              "must": [
                {
                  "match": {
                    "json.value.trackingId": trackingId
                  }
                },
                query
              ]
            }
          }
        }
      }, function (err, resp, status) {
        if (err) reject(err);
        else resolve(resp);
        strapi.log.info('---Client Notification Search Returned--- ',resp);
      });
    })
    return {response, rule};
  }

};
