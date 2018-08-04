'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK] [YEAR (optional)]
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

 let getUniqueUsers = async function(index, trackingId, callback) {
  try {
    await strapi.services.elasticsearch.getAllUniqueUsers(index, trackingId).then(res=>{
      callback(null, res);
    });
  } catch(err) {
    callback(err);
  }
}

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
      let path = details._source.json.value.source.url.pathname;

      let userDetail = {
        email: email,
        timestamp: timestamp,
        city: city,
        country: country,
        latitude: latitude,
        longitude: longitude,
        trackingId: trackingId,
        host: host,
        path: path
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
        client.update({
          index: `signups`,
          type: 'user',
          id: uuidv1(),
          body: {
            doc: user,
            doc_as_upsert: true
          }
        }, (err, res)=>{
          return;
        });
      });
    });
  }
}

module.exports = {

  /**
   * Cron for updating users unique visitors
   * Every minute.
  **/
  '* * * * *': () => {
    Campaign
    .find({ isActive: true })
    .populate({
      path: 'profile',
      select: '_id user uniqueVisitorQouta uniqueVisitors uniqueVisitorsQoutaLeft',
      populate: {
        path: 'user',
        select: 'email username'
      }
    })
    .lean()
    .exec()
    .then(async data => {
      await data.map(async campaign => {
        const profile = campaign.profile;
        const user = profile.user;
        let usersUniqueVisitors = profile.uniqueVisitors;
        let uniqueVisitorQouta = profile.uniqueVisitorQouta;
        let uniqueVisitorsQoutaLeft = profile.uniqueVisitorsQoutaLeft;
        let response;
        //'INF-406jkjiji00uszj' for testing
        //campaign.trackingId original
        await getUniqueUsers('filebeat-*', campaign.trackingId, (err, usersUnique) => {
					if(!err)
						response = usersUnique;
				});

        let campaignOption, profileOption, campaignUniqueVisitors = 0;
        if(response && response.aggregations.users.buckets.length)
          response.aggregations.users.buckets.map(bucket => {
            campaignUniqueVisitors = campaignUniqueVisitors + bucket.visitors.buckets.length + bucket.visitors.sum_other_doc_count;
          });
        else
          campaignUniqueVisitors = 0;

        usersUniqueVisitors = usersUniqueVisitors - campaign.uniqueVisitors?campaign.uniqueVisitors:0 + campaignUniqueVisitors;
        uniqueVisitorsQoutaLeft = uniqueVisitorQouta - usersUniqueVisitors;

        if(uniqueVisitorsQoutaLeft <= 0) {
          campaignOption = { uniqueVisitors: campaignUniqueVisitors, isActive: false };
          profileOption = { uniqueVisitors: usersUniqueVisitors, uniqueVisitorsQoutaLeft: 0  };
          const email = result.email;
          const name = result.username.charAt(0).toUpperCase() + result.username.substr(1);
          await strapi.plugins.email.services.email.limitExceeded(email, name, uniqueVisitorQouta);
        } else {
          campaignOption = { uniqueVisitors: campaignUniqueVisitors }
          profileOption = { uniqueVisitors: usersUniqueVisitors, uniqueVisitorsQoutaLeft: uniqueVisitorsQoutaLeft  };
        }

        await Campaign.update({_id: campaign._id}, {$set: campaignOption });
        await Profile.update({_id: profile._id}, {$set: profileOption });
      });
    });
  },

  /**
   * Corn for logging new users
   * Runs every minute
  **/
  '* * * * *': () => {
    Campaign.find(
      {},
      {
        log: 1,
        campaignName: 1,
        logTime: 1,
        rule: 1,
        trackingId: 1
      }
    )
    .lean()
    .exec()
    .then(async campaigns => {
      await campaigns.map(async campaign => {
        let captureLeads = await strapi.api.notificationpath.services.notificationpath.findRulesPath({_id: campaign.rule, type: 'lead'});
        captureLeads = captureLeads.map(lead => lead.url);

        /**
        *query to search user not logged
        **/
        let logQuery = {
          index: 'filebeat-*',
          body: {
            query: {
              "bool": {
                "must": [
                  { "match": { "json.value.trackingId":  campaign.trackingId }},
                  { "terms": { "json.value.source.url.pathname": captureLeads }},
                  { "match": { "json.value.event": 'formsubmit' }},
                  { "range":
                    { "@timestamp":
                      {
                        "gte": moment(campaign.logTime).format(),
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
        await logUser(logQuery, campaign.websiteUrl);

        /**
        *update campaign with new log time
        **/
        await Campaign.update({_id: campaign._id}, {$set:{logTime: Date.now()}});
      });
    });
  }

};
