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
  requestTimeout: Infinity, // Tested
  keepAlive: true, // Tested
  log: 'trace'
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

  notification: async (index, trackingId, type, limit, host) => {
    let query;
    let configurations = [];

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
        otherText: 1,
        liveVisitorText: 1,
        channel: 1
      }
    )
    .exec()
    .then(result => result);

    let subcampaigns = await Subcampaign.find({campaign: rule?rule.campaign:null});

    let captureLeads = await strapi.api.notificationpath.services.notificationpath.findRulesPath({_id: rule._id, type: 'lead', domain: host});
    let displayLeads = await strapi.api.notificationpath.services.notificationpath.findRulesPath({_id: rule._id, type: 'display', domain: host});

    const defaultLeads = displayLeads.filter(display => display.campaignName === rule.companyName);

    await configurations.push({
      paths: defaultLeads.map(lead => lead.url),
      configuration: configuration
    });

    await subcampaigns.map(subcampaign => {
      configurations.push({
        paths: [subcampaign.captureUrl],
        configuration: subcampaign[type]
      });
    });

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
            "size": 0,
            "aggs" : {
              "users" : {
                "composite" : {
                  "sources" : [
                    {
                      "visitorId": {
                        "terms" : { "field" : "json.value.visitorId" }
                      }
                    },
                    {
                      "path": {
                        "terms" : { "field" : "json.value.source.url.pathname" }
                      }
                    }

                  ]
                }
              }
            }
          }
        };
        break;
      case 'identification' :
        let identificationQuery = !limit ?
          [
            { "match": { "host.keyword": host }},
            { "match": { "trackingId.keyword":  trackingId }},
            { "range":
              { "timestamp":
                { "gte": `now-${Number(configuration.panelStyle.bulkData)}${configuration.panelStyle.selectDurationData==='days'?'d':'h'}`,
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
                "must": identificationQuery
              }
            },
            "sort" : [
              { "timestamp" : {"order" : "desc", "mode" : "max"}}
            ],
            "size": 10000
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
      if(type == 'journey' || type == 'identification') {
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
            return { response, rule, configurations };
          return { response, rule, configurations, userDetails };
        } else {
          return { response, rule, configurations }
        }
      } else
        return { response, rule, configurations };
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

    return response;
  }
}
