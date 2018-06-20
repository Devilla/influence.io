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
	"hideNotification" : true,
	"loopNotification" : true,
	"delayNotification" : false,
	"closeNotification" : false,
	"initialDelay" : 1,
	"displayTime" : 3,
	"delayBetween" : 3,
	"displayPosition" : "Bottom Left",
	"popupAnimationIn" : "fadeInUp",
	"popupAnimationOut" : "fadeOutDown"
};

let configurationDefault = {
  "activity" : true,
  "panelStyle" : {
    "radius" : 50,
    "borderWidth" : 0,
    "borderColor" : {
      "r" : 200,
      "g" : 200,
      "b" : 200,
      "a" : 0.80
    },
    "shadow" : {
	    r: 0,
	    g: 0,
	    b: 0,
	    color: 'lightgrey'
	  },
    "blur" : 0,
    "color" : {
      "r" : 0,
      "g" : 0,
      "b" : 0,
			"a" : 1
    },
		"linkColor": {
	    "r": 0,
	    "g": 137,
	    "b": 216,
	    "a": 1
	  },
    "backgroundColor" : {
      "r" : 255,
      "g" : 255,
      "b" : 255,
      "a" : 1
    },
    "fontFamily" : "inherit",
    "fontWeight" : "normal",
		"linkFontFamily": "inherit",
	  "linkFontWeight": "normal",
		"selectDurationData": "hours",
	  "selectLastDisplayConversation": "hours",
		"bulkData" : 5,
	  "recentNumber" : 5,
	  "recentConv" : 5,
	  "hideAnonymousConversion" : true,
	  "onlyDisplayNotification" : false,
		liveVisitorCount: 0
  },
  "contentText" : "Recently signed up for Company Name",
	"visitorText" : "people",
	"notificationUrl" : null,
	"toggleMap" : true
};

let getUniqueUsers = async function(index, trackingId, callback) {
  try {
    await strapi.services.elasticsearch.uniqueUsersWeekly(index, trackingId).then(res=>{
      callback(null, res);
    });
  } catch(err) {
    callback(err);
  }
}

let getSignUps = async function(index, trackingId, type, callback) {
  try {
    await strapi.services.elasticsearch.notification(index, trackingId, type).then(res=>{
      callback(null, res);
    });
  } catch(err) {
    callback(err);
  }
}

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
   * Promise to fetch a campaign with Tracking Id.
   *
   * @return {Promise}
   */

  fetchTrackingId: (params) => {
    return Campaign
      .findOne(
				{
					trackingId: params?params.trackingId:null
				},
				{
					isActive: 1,
					websiteUrl: 1,
					_id: 0
				}
			)
			.exec()
			.then(data => data);
		},

  /**
   * Promise to add a/an campaign.
   *
   * @return {Promise}
   */

  add: async (values) => {
		values.websiteUrl = values.websiteUrl.toLowerCase().replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
		values.isActive = true;
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
			const data = await Campaign.create(values);
			await Notificationtypes.find()
      .exec()
      .then(notifications => {
        notifications.map(notification => {
          let newConfiguration = configurationDefault;
          newConfiguration['campaign'] = data._id;
          newConfiguration['notificationType'] = notification._id;
					if(notification.notificationName == 'Recent Activity') {
						newConfiguration.panelStyle.radius = 50;
						newConfiguration['contentText'] = 'Recently signed up for Company Name';
					}
					if(notification.notificationName == 'Bulk Activity') {
						newConfiguration.panelStyle.radius = 7;
						newConfiguration['contentText'] = 'Company';
					}
					if(notification.notificationName == 'Live Visitor Count') {
						newConfiguration.panelStyle.radius = 50;
						newConfiguration['contentText'] = 'Company';
					}
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

      await strapi.models[association.model || association.collection].remove(
        search
     	);
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
			.lean()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit);

    const campaignFilter = await campaign.filter(camp => camp.trackingId && camp.isActive);
    const campaignWebsites = await campaignFilter.map(camp => camp);
    const campaignIds = await campaignFilter.map(camp => camp._id);

    await Configuration.count({ campaign: {$in: campaignIds}, activity: true})
        .exec()
        .then(counts => {
          countConfig = counts;
        });

		let uniqueUsers = [];
    let pica = campaignWebsites.map(async camp => {
        await getUniqueUsers('filebeat-*', camp.trackingId, (err, usersUnique) => {
					if(!err) {
						uniqueUsers.push(usersUnique);
						camp['uniqueUsers'] = usersUnique;
					}
					return camp;
				});
				return camp;
		});

		await Promise.all(pica);

		// let userSignUps = [];
		let signedUpUsers = campaignWebsites.map(async camp => {
			await getSignUps('filebeat-*', camp.trackingId, 'journey', (err, response) => {
				if(!err) {
					camp['signups'] = response;
				}
				return camp;
			});
			return camp;
		});

		await Promise.all(signedUpUsers);

    return {websiteLive: campaignWebsites, notificationCount: countConfig, uniqueUsers: uniqueUsers };
  },
};
