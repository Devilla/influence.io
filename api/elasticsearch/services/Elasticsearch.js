'use strict';

/**
 * Elasticsearch.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.

const elasticsearch = require('elasticsearch');
const moment = require('moment');
var http = require('http')

const client = elasticsearch.Client({
  host: 'elasticsearch:9200', // Remove this Should get it from the strapi.config.elasticsearchNode
  requestTimeout: Infinity, // Tested
  keepAlive: true, // Tested
  log: 'trace'
});

let getUser = async function(email, callback) {
  let userDetail;
  try {
    await strapi.services.enrichment.picasaWeb(email).then(res=>{
      callback(null, res);
    });
  } catch(err) {
    try {
      await strapi.services.enrichment.gravatr(email).then(res => {
        callback(null, res);
      });
    } catch(err) {
      userDetail = {
        username: email.replace(/@.*$/,"")
      };
      callback(null, userDetail);
    }
  }
}

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

    const rule = await Campaign.findOne(
      {
        trackingId: trackingId
      },
      {
        campaignName: 1,
        rule: 1
      }
    )
    .populate({
      path: 'rule',
      select: {
        hideNotification: 1,
        loopNotification: 1,
        delayNotification: 1,
        closeNotification: 1,
        hideAnonymous: 1,
        displayNotifications: 1,
        initialDelay: 1,
        displayTime: 1,
        delayBetween: 1,
        displayPosition: 1,
        campaign: 1
      }
    })
    .lean()
    .exec()
    .then(result => {
      if(result) {
        let newRule = result.rule;
        newRule['companyName'] = result.campaignName;
        return newRule;
      } else {
        return null;
      }
    });

    let notificationType = () => {
      if(type == 'live')
        return 'Live Visitor Count';
      else if(type == 'identification')
        return 'Bulk Activity';
      else if(type == 'journey')
        return 'Recent Activity';
    }

    const notification = await Notificationtypes.findOne(
      {
        notificationName: notificationType()
      },
      {
        _id: 1
      }
    )
    .exec()
    .then(data => data?data.id:null);

    const configuration = await Configuration.findOne(
      {
        notificationType: notification,
        campaign: rule?rule.campaign:null
      },
      {
        contentText: 1,
        panelStyle: 1,
        activity: 1
      }
    )
    .exec()
    .then(result => result);

    let captureLeads = await strapi.api.notificationpath.services.notificationpath.findRulesPath({_id: rule._id, type: 'lead'});
    captureLeads = captureLeads.map(lead => lead.url);

    switch(type) {
      case 'live' :
        query = {
          index: index,
          body: {
            query: {
              "bool": {
                "must": [
                  { "match": { "json.value.trackingId":  trackingId }},
                  { "range": { "@timestamp": { "gte": moment().subtract(7, 'minutes').format(), "lt": moment().format() }}}
                ]
              }
            },
            "aggs" : {
              "users" : {
                "terms" : { "field" : "json.value.visitorId" }
              }
            }
          }
        };
        break;
      case 'identification' :
        query = {
          index: index,
          body: {
            query: {
              "bool": {
                "must": [
                  { "match": { "json.value.trackingId":  trackingId }},
                  { "terms": { "json.value.source.url.pathname": captureLeads }},
                  { "match": { "json.value.event": 'formsubmit' }},
                  { "range": { "@timestamp": { "gte": `now-${Number(configuration.panelStyle.bulkData)}${configuration.panelStyle.selectDurationData==='days'?'d':'h'}`, "lt" :  "now" }}},
                  { "exists" : { "field" : "json.value.form.email" }}
                ]
              }
            },
            "aggs" : {
              "users" : {
                "terms" : { "field" : "json.value.form.email" }
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
                  { "terms": { "json.value.source.url.pathname": captureLeads }},
                  { "match": { "json.value.event": 'formsubmit' }},
                  { "range": { "@timestamp": { "gte": `now-${Number(configuration.panelStyle.recentConv)}${configuration.panelStyle.selectLastDisplayConversation==='days'?'d':'h'}`, "lt" :  "now" }}},
                  { "exists" : { "field" : "json.value.form.email" }}
                ]
              }
            },
            "sort" : [
              { "@timestamp" : {"order" : "desc", "mode" : "max"}}
            ],
            "size": Number(configuration.panelStyle.recentNumber),
            "aggs" : {
              "users" : {
                "terms" : { "field" : "json.value.form.email", "size" : Number(configuration.panelStyle.recentNumber) },
                "aggs": {
                  "user_docs": {
                    "top_hits": {
                        "sort": [
                          {
                            "@timestamp": {
                                "order": "desc"
                            }
                          }
                        ],
                        "_source": {
                          "includes": [ "json" ]
                        },
                        "size" : 1
                    }
                  }
                }
              }
            }
          }
        };
        break;
      default:
        break;
    }


    if(rule) {
      let userDetails = [];
      const response = await new Promise((resolve, reject) => {
        client.search(query, function (err, resp, status) {
          if (err) reject(err);
          else resolve(resp);
        });
      });

      if(type == 'journey') {
        if(response.aggregations.users.buckets.length) {
          console.log(response.aggregations.users.buckets, "============");
          await response.aggregations.users.buckets.map(details => {
            details = details.user_docs.hits.hits[0];
            let email = details._source.json.value.form.email;
            let timestamp = details._source.json.value.timestamp;
            let city = details._source.json.value.geo?
                details._source.json.value.geo.city
              :
                null;
            let country = details._source.json.value.geo?
                details._source.json.value.geo.country
              :
                null;
            let userDetail;
            userDetail['email'] = email;
            userDetail['timestamp'] = timestamp;
            userDetail['city'] = city;
            userDetail['country'] = country;
            userDetail['response'] = details._source;
            userDetails.push(userDetail);
          });

          await userDetails.map(user => {
            getUser(email, (err, userDetail) => {
              if(err)
                throw err;
              else {
                user[info] = userDetail;
              }
            });
          })

          console.log(userDetails, "=============>userDetails");
          return { response, rule, configuration, userDetails };
        } else {
          return { response, rule, configuration, userDetails:null };
        }
      } else {
        return { response, rule, configuration };
      }
    } else {
      return { error: "Tracking Id not found" };
    }
  },

  uniqueUsers: async (index, trackingId) => {
    const query = {
      index: index,
      body: {
        query: {
          "bool": {
            "must": [
              { "match": { "json.value.trackingId":  trackingId }}
            ]
          }
        },
        "aggs" : {
          "users" : {
            "terms" : { "field" : "json.value.visitorId" }
          }
        }
      }
    };

    const response = await new Promise((resolve, reject) => {
      client.search(query, function (err, resp, status) {
        if (err) reject(err);
        else resolve(resp);
      });
    });

    return response;
  }

};
