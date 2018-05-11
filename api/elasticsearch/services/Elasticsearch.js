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
    .exec()
    .then(result => {
      if(result) {
        let rule = result.rule;
        rule['companyName'] = result.campaignName;
        return rule;
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
        campaign: rule.campaign
      },
      {
        contentText: 1,
        panelStyle: 1,
        activity: 1
      }
    )
    .exec()
    .then(result => result);

    if(rule) {
      var userDetails;
      const response = await new Promise((resolve, reject) => {
        client.search(query, function (err, resp, status) {
          if (err) reject(err);
          else resolve(resp);
        });
      });

      if(type == 'journey') {
        if(response.hits.hits[0]) {
          let email = response.hits.hits[0]._source.json.value.form.email;
          let timestamp = response.hits.hits[0]._source.json.value.timestamp;
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
          userDetails['timestamp'] = timestamp;
        } else {
          userDetails = null;
        }
      }

      return {response, rule, configuration, userDetails};
    } else {
      return {error: "Tracking Id not found"};
    }
  }

};
