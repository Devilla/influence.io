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
  host: '35.202.85.190:9200', // Remove this Should get it from the strapi.config.elasticsearchNode
  requestTimeout: Infinity, // Testedcd
  keepAlive: true, // Tested
  log: 'trace'
});

/**
*gets enrichment data of a user
* Input : email, callback
* Output :  create elasticsearch - updated data
**/
let getUser = async function(email, callback) {
  let userDetail;
  try {
    const res = await strapi.services.enrichment.picasaWeb(email);
      callback(null, res);
  } catch(err) {
    try {
      const res = await strapi.services.enrichment.gravatr(email);
        callback(null, res);
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
* Input : query, hostName
* Output :  elasticsearch - users data
**/
let logUser = async function(query, hostName) {
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

      let form = details._source.json.value.form;
      let email = form.email || form.EMAIL || form.Email;
      let timestamp = moment(details._source.json.value.timestamp).format();
      let geo = details._source.json.value.geo;
      let city = geo?geo.city:null;
      let country = geo?geo.country:null;
      let latitude = geo?geo.latitude:null;
      let longitude = geo?geo.longitude:null;
      let trackingId = details._source.json.value.trackingId;
      let host = hostName;
      let userDetail = {
        email: email,
        timestamp: timestamp,
        city: city,
        country: country,
        latitude: latitude,
        longitude: longitude,
        trackingId: trackingId,
        host: host
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
          index: `signups`,
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

  notification: async (index, trackingId, type, limit, host) => {
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

    let captureLeads = await strapi.api.notificationpath.services.notificationpath.findRulesPath({_id: rule._id, type: 'lead', domain: host});
    captureLeads = captureLeads.map(lead => lead.url);

    switch(type) {
      case 'live' :
        query = {
          index: index,
          body: {
            query: {
              "bool": {
                "must": [
                  { "match": { "json.value.source.url.hostname": host }},
                  { "match": { "json.value.trackingId":  trackingId }},
                  { "range": { "@timestamp": { "gte": moment().subtract(15, 'minutes').format(), "lt": moment().format() }}}
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
                  { "match": { "json.value.source.url.hostname": host }},
                  { "match": { "json.value.trackingId":  trackingId }},
                  { "terms": { "json.value.source.url.pathname": captureLeads }},
                  { "match": { "json.value.event": 'formsubmit' }},
                  { "range": { "@timestamp": { "gte": `now-${Number(configuration.panelStyle.bulkData)}${configuration.panelStyle.selectDurationData==='days'?'d':'h'}`, "lt" :  "now" }}}
                ],
                "should": [
                  { "exists" : { "field" : "json.value.form.email" }},
                  { "exists" : { "field" : "json.value.form.EMAIL" }},
                  { "exists" : { "field" : "json.value.form.Email" }}
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
        let mustQuery = !limit ?
          [
            { "match": { "host.keyword": host }},
            { "match": { "trackingId.keyword":  trackingId }},
            { "range":
              { "timestamp":
                { "gte": `now-${Number(configuration.panelStyle.recentConv)}${configuration.panelStyle.selectLastDisplayConversation==='days'?'d':'h'}`,
                  "lt" :  "now+1d"
                }
              }
            }
          ]
        :
          [
            { "match": { "trackingId.keyword":  trackingId }},
            { "range":
              { "timestamp":
                { "gte": "now-365d",
                  "lt" :  "now+1d"
                }
              }
            }
          ];
        query = {
          index: 'signups',
          body: {
            query: {
              "bool": {
                "must": mustQuery
              }
            },
            "sort" : [
              { "timestamp" : {"order" : "desc", "mode" : "max"}}
            ],
            "size": limit?10000:Number(configuration.panelStyle.recentNumber)
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
      await logUser(logQuery, host);

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
        if(response.hits && response.hits.hits.length) {
          await response.hits.hits.map(details => {
            userDetails.push(details._source);
          });

          /**
          *sort according to timeStamp
          **/
          var sortByDateAsc = await function (lhs, rhs)  {
            return moment(lhs.timestamp) < moment(rhs.timestamp) ? 1 : moment(lhs.timestamp) > moment(rhs.timestamp) ? -1 : 0;
          }

          userDetails = await userDetails.filter(user => user.trackingId === trackingId);
          userDetails = await userDetails.filter((user, index, self) => self.findIndex(t => t.email === user.email) === index);
          userDetails.sort(sortByDateAsc);

          if(!userDetails.length)
            return { response, rule, configuration };
          return { response, rule, configuration, userDetails };
        } else {
          return { response, rule, configuration }
        }
      } else
        return { response, rule, configuration };
    } else {
      return { error: "Tracking Id not found" };
    }
  },

  /**
  *logs unique Users Weekly
  * Input : index, trackingId
  * Output :  response - status
  **/

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

  /**
  *logs get all unique Users Weekly
  * Input : index, trackingId
  * Output :  response - status
  **/


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
  },

  validatePath: async (index, trackingId, path) => {
    const query = {
      index: index,
      body: {
        query: {
          "bool": {
            "must": [
              { "match": { "json.value.trackingId":  trackingId }},
              { "match": { "json.value.source.url.pathname":  path }},
              {
                "range": {
                  "@timestamp": {
                    "gte": 'now-365d',
                    "lt" : 'now+1d'
                  }
                }
              },
            ]
          }
        },
        "size": 1
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

  mapGraph: async (index, trackingIds) => {
    const query = {
      index: index,
      body: {
      	"size":0,
      	"_source":{
      	  "excludes":[]
      	},
      	"aggs":{
      	  "body":{
      	    "terms":{
      	      "field":"json.value.geo.country",
      	      "size":100,
      	      "order":{
      	        "_term":"asc"
      	      }
      	    }
      	  }
      	},
      	"stored_fields":["*"],
      	"script_fields":{},
      	"docvalue_fields":["@timestamp"],
      	"query":{
          "bool":{
            "must":[{
              "terms": {
                "json.value.trackingId":  trackingIds
              }
            },{
              "range":{
                "@timestamp":{
                  "gte":"now-7d",
                  "lte":"now",
                  "format":"epoch_millis"
                }
              }
            }],
            "filter":[],
            "should":[],
            "must_not":[]
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

    let mapArray = [['Country', 'traffic']];
    response.aggregations.body.buckets.map(country => mapArray.push(Object.values(country)));

    return mapArray;
  },

  heatMapGraph: async (index, trackingIds) => {
    const query = {
      index: index,
      body: {
      	"size": 0,
      	"query":{
        	"bool":{
            	"must":[{
            		"terms": {
                		"json.value.trackingId":  trackingIds
            		}
        		},{
              "range":{
                "@timestamp":{
                  "gte":"now-7d",
                  "lte":"now",
                  "format":"epoch_millis"
                }
              }
            }]
        	}
      	},
      	"aggs": {
      		"hour": {
            "date_histogram": {
      				"field": "@timestamp",
      				"interval": "hour",
      				"min_doc_count": 0
      			}
      		}
      	}
      }
    };

    let response = await new Promise((resolve, reject) => {
      client.search(query, function (err, resp, status) {
        if (err) reject(err);
        else resolve(resp);
      });
    });
    let data = [];
    const sortedBucket = await response.aggregations.hour.buckets.sort((a, b) => {
      return moment(b.key_as_string).diff(moment(a.key_as_string))
    });
    await sortedBucket.map(info => {
      let hour = moment(info.key_as_string).hour();
      data[hour] = data[hour]?data[hour]:[];
      data[hour].push(info.doc_count);
    });
    return data;
  },

  conversionGraph: async (index, profile, host) => {
    const queryModel = (trackingId, captureLeads) =>  {
      return {
        index: 'signups',
        body: {
          "query":{
            "bool":{
              "must":[
              {
                "match": {
                  "trackingId":  trackingId,
                }
              },{
                "terms": {
                  "path": captureLeads
                }
              },{
                  "range":{
                    "timestamp":{
                      "gte":"now-7d",
                      "lte":"now",
                      "format":"epoch_millis"
                    }
                  }
                }
              ]
            }
          },
        	"size":0,
          "aggs":{
            "email": {
              "terms" : { "field" : "email.keyword" }
            }
          }
        }
      }
    };
    let campaignConversionDetails = [];
    let campaignData = await Campaign.find({profile: profile},{rule: 1, trackingId: 1})

    await campaignData.map(async campaign => {
      let captureLeads = await strapi.api.notificationpath.services.notificationpath.findRulesPath({_id: campaign.rule, type: 'lead', domain: host});
      captureLeads = captureLeads.map(lead => lead.url);
      const query = queryModel(campaign.trackingId, captureLeads);
      let response = await new Promise((resolve, reject) => {
        client.search(query, function (err, resp, status) {
          if (err) reject(err);
          else resolve(resp);
        });
      });
      await campaignConversionDetails.push(response);
    });

    return await campaignConversionDetails;
  }
}
