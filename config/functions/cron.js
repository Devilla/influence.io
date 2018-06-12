'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK] [YEAR (optional)]
 */

const elasticsearch = require('elasticsearch');
const client = elasticsearch.Client({
  host: '159.89.80.206:9200', // Remove this Should get it from the strapi.config.elasticsearchNode
  requestTimeout: Infinity, // Tested
  keepAlive: true, // Tested
  log: 'trace'
});

  const index = 'filebeat-*';
  const query = (trackingId) => {
    return {
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
  }


module.exports = {

  /**
   * Simple example.
   * Every monday at 1am.
   */

  '* * * * *': () => {
    Campaign
    .find({ isActive: true })
    .populate({
      path: 'profile',
      select: '_id user uniqueVisitorQouta uniqueVisitors uniqueVisitorsQoutaLeft'
    })
    .lean()
    .exec()
    .then(async data => {
      await data.map(async campaign => {
        console.log(campaign.profile);
        let profile = campaign.profile;
        let usersUniqueVisitors = profile.uniqueVisitors;
        let uniqueVisitorQouta = profile.uniqueVisitorQouta;
        let uniqueVisitorsQoutaLeft = profile.uniqueVisitorsQoutaLeft;

        const response = await new Promise((resolve, reject) => {
         client.search(query('INF-406jkjiji00uszj'), function (err, resp, status) {
            if (err) reject(err);
            else resolve(resp);
          });
        });
        let campaignOption, profileOption, campaignUniqueVisitors = 0;
        if(response.aggregations.users.buckets.length) {
          response.aggregations.users.buckets.map(bucket => {
            campaignUniqueVisitors = campaignUniqueVisitors + bucket.visitors.buckets.length + bucket.visitors.sum_other_doc_count
          });
        }
        else
          campaignUniqueVisitors = 0;

        usersUniqueVisitors = usersUniqueVisitors - campaign.uniqueVisitors + campaignUniqueVisitors;
        uniqueVisitorsQoutaLeft = uniqueVisitorQouta - usersUniqueVisitors;
        if(uniqueVisitorsQoutaLeft <= 0) {
          campaignOption = { uniqueVisitors: campaignUniqueVisitors, isActive: false };
          profileOption = { uniqueVisitors: usersUniqueVisitors, uniqueVisitorsQoutaLeft: 0  };

        } else {
          campaignOption = { uniqueVisitors: campaignUniqueVisitors }
          profileOption = { uniqueVisitors: usersUniqueVisitors, uniqueVisitorsQoutaLeft: uniqueVisitorsQoutaLeft  };
        }

        await Campaign.update({_id: campaign._id}, {$set: campaignOption });
        await Profile.update({_id: profile._id}, {$set: profileOption });

        });
    });
  }
};
