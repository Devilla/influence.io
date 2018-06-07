'use strict';

/**
 * Rules.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all user rules.
   *
   * @return {Promise}
   */

  fetchAllUserRules: (params) => {

    return Campaign
      .aggregate([
        { $match : { profile : params?params._id:null } },
        { $group: { _id: '$_id' } }
      ])
      .exec()
      .then(campaignIds => {

        if(campaignIds) {
          campaignIds = campaignIds.map(campaignId => campaignId._id );

          return Notificationtypes
            .aggregate([
              { $match : { campaign : { $in: campaignIds }  } },
              { $group: { _id: '$_id' } }
            ])
            .exec()
            .then(notificationIds => {

              if(notificationIds) {
                notificationIds = notificationIds.map(notificationId => notificationId._id );

                const query = {
                  notificationTypes: { $in: notificationIds }
                };

                const convertedParams = strapi.utils.models.convertParams('notificationtypes', query);

                return Rules
                  .find()
                  .where(convertedParams.where)
                  .sort(convertedParams.sort)
                  .skip(convertedParams.start)
                  .limit(convertedParams.limit)
                  .populate(_.keys(_.groupBy(_.reject(strapi.models.rules.associations, {autoPopulate: false}), 'alias')).join(' '));
              } else {
                return [];
              }
            });
        }
      });
  },

  /**
   * Promise to fetch all campaign rules.
   *
   * @return {Promise}
   */

  fetchAllCampaignRules: (params) => {

    const query = {
      campaign: params?params.id:null
    };

    const convertedParams = strapi.utils.models.convertParams('rules', query);

    return Rules
      .findOne()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit);
  },

  /**
   * Promise to fetch all campaign rules.
   *
   * @return {Promise}
   */

  fetchAllNotificationTypesRules: (params) => {

    return Notificationtypes
      .findOne({_id: params.id})
      .exec()
      .then(notificationType => {

        if(notificationType) {

          const query = {
            notificationTypes: notificationType._id
          };

          const convertedParams = strapi.utils.models.convertParams('notificationtypes', query);

          return Rules
            .find()
            .where(convertedParams.where)
            .sort(convertedParams.sort)
            .skip(convertedParams.start)
            .limit(convertedParams.limit)
            .populate(_.keys(_.groupBy(_.reject(strapi.models.rules.associations, {autoPopulate: false}), 'alias')).join(' '));
        } else {
          return [];
        }
      });
  },

  /**
   * Promise to fetch all rules.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    const convertedParams = strapi.utils.models.convertParams('rules', params);

    return Rules
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.rules.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch all rules notification configuration and path.
   *
   * @return {Promise}
   */

  findNotificationConfigurationPath: async (params) => {
    const rule = await Campaign.findOne(
      {
        trackingId: params?params.trackingId:null
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

    const notificationPath = await Notificationpath.find({
      rule: rule?rule._id:null
    })
    .exec()
    .then(result => result);

    const data = {
      rule: rule,
      notificationPath: notificationPath
    }

    return data;
  },

  /**
   * Promise to fetch a/an rules.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return Rules
      .findOne(_.pick(params, _.keys(Rules.schema.paths)))
      .populate(_.keys(_.groupBy(_.reject(strapi.models.rules.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an rules.
   *
   * @return {Promise}
   */

  add: async (values) => {
    const data = await Rules.create(_.omit(values, _.keys(_.groupBy(strapi.models.rules.associations, 'alias'))));
    await strapi.hook.mongoose.manageRelations('rules', _.merge(_.clone(data), { values }));
    return data;
  },

  /**
   * Promise to edit a/an rules.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    // await strapi.hook.mongoose.manageRelations('rules', _.merge(_.clone(params), { values }));
    return await Rules.update(params, values, { multi: true });
  },

  /**
   * Promise to remove a/an rules.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Rules.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.rules.associations, {autoPopulate: false}), 'alias')).join(' '));

    _.forEach(Rules.associations, async association => {
      const search = (_.endsWith(association.nature, 'One')) ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
      const update = (_.endsWith(association.nature, 'One')) ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

      await strapi.models[association.model || association.collection].update(
        search,
        update,
        { multi: true });
    });

    return data;
  }
};
