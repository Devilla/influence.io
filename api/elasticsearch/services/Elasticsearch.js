'use strict';

/**
 * Elasticsearch.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const elasticsearch = require('elasticsearch');
const moment = require('moment');
const uuidv1 = require('uuid/v1');

const client = elasticsearch.Client({
  host: 'elasticsearch:9200', // Remove this Should get it from the strapi.config.elasticsearchNode
  requestTimeout: Infinity, // Tested
  keepAlive: true, // Tested
  log: 'trace'
});

/**
*gets enrichment data of a user
**/
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
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      userDetail = {
        username: re.test(email)?email.replace(/@.*$/,""):'Anonymous'
      };
      callback(null, userDetail);
    }
  }
}

/**
*logs users data
**/
let logUser = async function(query) {
  let userDetails = [];
  const response = await new Promise((resolve, reject) => {
    client.search(query, function (err, resp, status) {
      if (err) reject(err);
      else resolve(resp);
    });
  });

  if(response.aggregations && response.aggregations.users.buckets.length) {
    await response.aggregations.users.buckets.map(details => {
      details = details.user_docs.hits.hits[0];
      let email = details._source.json.value.form.email;
      let timestamp = details._source.json.value.timestamp;
      let geo = details._source.json.value.geo;
      let city = geo?geo.city:null;
      let country = geo?geo.country:null;
      let latitude = geo?geo.latitude:null;
      let longitude = geo?geo.longitude:null;
      let trackingId = details._source.json.value.trackingId;
      let userDetail = {
        email: email,
        timestamp: timestamp,
        city: city,
        country: country,
        latitude: latitude,
        longitude: longitude,
        trackingId: trackingId
      };
      userDetails.push(userDetail);
    });

    const userList = userDetails.map(async user => {

      await getUser(user.email, (err, userDetail) => {
        if(err)
          throw err;
        else {
          user['username'] = userDetail.username;
          user['profile_pic'] = userDetail.profile_pic;
        }

        /**
        *log data to elasticsearch
        **/
        client.create({
          index: `signups-${Date.now()}`,
          type: 'user',
          id: uuidv1(),
          body: user
        }, (err, res)=>{
          return;
        });
      });
    });
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

  notification: async (index, trackingId, type, limit) => {
    var query;

    const rule = await Campaign.findOne(
      {
        trackingId: trackingId
      },
      {
        log: 1,
        campaignName: 1,
        logTime: 1,
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
        campaign: 1,
        popupAnimationIn: 1,
        popupAnimationOut: 1
      }
    })
    .lean()
    .exec()
    .then(result => {
      if(result) {
        let newRule = result.rule;
        newRule['companyName'] = result.campaignName;
        newRule['logTime'] = result.logTime;
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
      else if(type == 'review')
        return 'Review Notification';
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
        activity: 1,
        visitorText: 1,
        notificationUrl: 1,
        toggleMap: 1,
        channel: 1
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
                  // { "range": { "json.value.timestamp": { "gte": moment().subtract(Number(configuration.panelStyle.bulkData), configuration.panelStyle.selectDurationData).format() , "lt" : moment().format() }}},
                  { "range": { "@timestamp": { "gte": `now-${Number(configuration.panelStyle.bulkData)}${configuration.panelStyle.selectDurationData==='days'?'d':'h'}`, "lt" :  "now" }}},
                  { "exists" : { "field" : "json.value.form.email" }}
                ]
              }
            },
            "aggs" : {
              "users" : {
                "terms" : {
                  "field" : "json.value.form.email",
                  "size" : 100000
                 }
              }
            }
          }
        };
        break;
      case 'journey' :
        query = {
          index: 'signups-*',
          body: {
            query: {
              "bool": {
                "must": [
                  { "match": { "trackingId":  trackingId }},
                  { "range":
                    { "timestamp":
                      { "gte": limit?
                          `now-365d`
                        :
                          `now-${Number(configuration.panelStyle.recentConv)}${configuration.panelStyle.selectLastDisplayConversation==='days'?'d':'h'}`,
                        "lt" :  "now+1d"
                      }
                    }
                  },
                  { "exists" : { "field" : "email" }}
                ]
              }
            },
            "sort" : [
              { "timestamp" : {"order" : "desc", "mode" : "max"}}
            ],
            "size": 0,
            "aggs" : {
              "users" : {
                "terms" : {
                  "field" : "email.keyword",
                  "size" : limit?1000000:Number(configuration.panelStyle.recentNumber)
                },
                "aggs": {
                  "user_docs": {
                    "top_hits": {
                        "sort": [
                          {
                            "timestamp": {
                                "order": "desc"
                            }
                          }
                        ],
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

    /**
    *log data to elasticsearch if not logged already
    **/
    if(type == 'journey') {
      /**
      *query to search user not logged
      **/
      let logQuery = {
        index: index,
        body: {
          query: {
            "bool": {
              "must": [
                { "match": { "json.value.trackingId":  trackingId }},
                { "terms": { "json.value.source.url.pathname": captureLeads }},
                { "match": { "json.value.event": 'formsubmit' }},
                { "range":
                  { "@timestamp":
                    { "gte": moment(rule.logTime).format(),
                      "lt" :  "now+1d"
                    }
                  }
                },
                { "exists" : { "field" : "json.value.form.email" }}
              ]
            }
          },
          "sort" : [
            { "@timestamp" : {"order" : "desc", "mode" : "max"}}
          ],
          "size": 10,
          "aggs" : {
            "users" : {
              "terms" : { "field" : "json.value.form.email", "size" : 10000 },
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

      /**
      *@params {logQuery}
      *logs data to elastic search
      **/
      await logUser(logQuery);

      /**
      *update campaign with new log time
      **/
      await Campaign.update({_id:rule.campaign}, {$set:{logTime: Date.now()}});
    }


    if(rule) {
      let userDetails = [];
      const response = await new Promise((resolve, reject) => {
        client.search(query, function (err, resp, status) {
          if (err) reject(err);
          else resolve(resp);
        });
      });

      /**
      *arrange and sort userdetails
      **/
      if(type == 'journey') {
        if(response.aggregations && response.aggregations.users.buckets.length) {
          await response.aggregations.users.buckets.map(details => {
            userDetails.push(details.user_docs.hits.hits[0]._source);
          });

          /**
          *sort according to timeStamp
          **/
          var sortByDateAsc = await function (lhs, rhs)  {
            return moment(lhs.timestamp) < moment(rhs.timestamp) ? 1 : moment(lhs.timestamp) > moment(rhs.timestamp) ? -1 : 0;
          }
          userDetails.filter(user => user.trackingId == trackingId);
          userDetails.sort(sortByDateAsc);

          return { response, rule, configuration, userDetails };
        }
      } else
        return { response, rule, configuration };
    } else {
      return { error: "Tracking Id not found" };
    }
  },

  uniqueUsersWeekly: async (index, trackingId) => {
    const query = {
      index: index,
      body: {
        query: {
          "bool": {
            "must": [
              { "match": { "json.value.trackingId":  trackingId }},
              {
                "range": {
                  "@timestamp": {
                    "gte": 'now-365d',
                    "lt" : moment().endOf('week')
                  }
                }
              },
            ]
          }
        },
        "size": 0,
        "aggs" : {
          "users" : {
            "date_histogram" : {
                "field" : "@timestamp",
                "interval" : "day"
            },
            "aggs" : {
              "visitors" : {
                  "terms" : {
                      "field" : "json.value.visitorId"
                  }
              }
            }
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
  },

  getAllUniqueUsers: async (index, trackingId) => {
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
        "size": 0,
        "aggs" : {
          "users" : {
            "date_histogram" : {
              "field" : "@timestamp",
              "interval" : "day"
            },
            "aggs" : {
              "visitors" : {
                "terms" : {
                  "field" : "json.value.visitorId"
                }
              }
            }
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
