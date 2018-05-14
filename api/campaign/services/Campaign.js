'use strict';

/**
 * Campaign.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const domainPing = require("domain-ping");

let ruleDefault = {
	"hideNotification" : false,
	"loopNotification" : true,
	"delayNotification" : true,
	"closeNotification" : false,
	"hideAnonymous" : false,
	"displayNotifications" : true,
	"initialDelay" : 1,
	"displayTime" : 3,
	"delayBetween" : 10,
	"displayPosition" : "Bottom Left",
};

let configurationDefault = {
  "activity" : true,
  "panelStyle" : {
    "radius" : 35,
    "borderWidth" : 0,
    "borderColor" : {
      "r" : 200,
      "g" : 200,
      "b" : 200,
      "a" : 1
    },
    "shadow" : 0,
    "blur" : 2,
    "color" : {
      "r" : 0,
      "g" : 0,
      "b" : 0
    },
    "backgroundColor" : {
      "r" : 255,
      "g" : 255,
      "b" : 255,
      "a" : 1
    },
    "fontFamily" : "inherit",
    "fontWeight" : "normal"
  },
  "contentText" : ""
};

module.exports = {

  /**
   * Promise to fetch all user campaigns.
   *
   * @return {Promise}
   */

  fetchUserCampaigns: async (params) => {
    const profile = await Profile.findOne({user: params?params:null})
      .exec()
      .then(data => data?data._id:null);

    const query = {
      profile: profile?profile:null
    };
    const convertedParams = strapi.utils.models.convertParams('campaign', query);

    return Campaign
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.campaign.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch all campaigns.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    const convertedParams = strapi.utils.models.convertParams('campaign', params);

    return Campaign
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.campaign.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch a/an campaign.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return Campaign
      .findOne(_.pick(params, _.keys(Campaign.schema.paths)))
      .populate(_.keys(_.groupBy(_.reject(strapi.models.campaign.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an campaign.
   *
   * @return {Promise}
   */

  add: async (values) => {
    values.websiteUrl = values.websiteUrl.replace(/(^\w+:|^)\/\//, '');
    var checkDomain = new Promise((resolve, reject) => {
      domainPing(values.websiteUrl)
       .then((res) => {
           resolve(res);
       })
       .catch((error) => {
         reject(error)
       });
    });

    var dom = await checkDomain
    .then((result) => {
      return result;
    })
    .catch(err => {
      return {error: true, message: "Invalid domain"};
    });

    if(dom.error) {
      return dom;
    } else {
      const data = await Campaign.create(_.omit(values, _.keys(_.groupBy(strapi.models.campaign.associations, 'alias'))));
      await strapi.hook.mongoose.manageRelations('campaign', _.merge(_.clone(data), { values }));

      await Notificationtypes.find()
        .exec()
        .then(notifications => {
          notifications.map(notification => {
            let newConfiguration = configurationDefault;
            newConfiguration['campaign'] = data._id;
            newConfiguration['notificationType'] = notification._id;
            Configuration.create(newConfiguration, (err, result) => {
              if(err)
                return err;
            });
          });
        });

      let newRules = ruleDefault;
      newRules['campaign'] = data._id;
      await Rules.create(newRules, (err, result) => {
        if(err)
          return err;
      });

      return data;
    }
  },

  /**
   * Promise to edit a/an campaign.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    await strapi.hook.mongoose.manageRelations('campaign', _.merge(_.clone(params), { values }));
    return Campaign.update(params, values, { upsert:false, multi: true });
  },

  /**
   * Promise to remove a/an campaign.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Campaign.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.campaign.associations, {autoPopulate: false}), 'alias')).join(' '));

    _.forEach(Campaign.associations, async association => {
      const search = (_.endsWith(association.nature, 'One')) ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
      const update = (_.endsWith(association.nature, 'One')) ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

      await strapi.models[association.model || association.collection].update(
        search,
        update,
        { multi: true });
    });

    return data;
  },

  /**
   * Promise to fetch user's campaigns info.
   *
   * @return {Promise}
   */

  fetchUserCampaignsInfo: async (params) => {
    let countConfig = 0;

    const profile = await Profile.findOne({user: params?params:null})
      .exec()
      .then(data => data?data._id:null);

    const query = {
      profile: profile?profile:null
    };

    const convertedParams = strapi.utils.models.convertParams('campaign', query);

    const campaign = await Campaign
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit);

    const campaignFilter = await campaign.filter(camp => camp.trackingId);
    const campaignWebsites = await campaignFilter.map(camp => camp.websiteUrl);
    const campaignIds = await campaignFilter.map(camp => camp._id);

    await Configuration.count({ campaign: {$in: campaignIds}, activity: true})
        .exec()
        .then(counts => {
          countConfig = counts;
        });

    return {websiteLive: campaignWebsites, notificationCount: countConfig};
  },
};
