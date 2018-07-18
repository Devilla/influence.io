'use strict';

/**
 * Notificationtypes.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all Campaign notificationtypes for a user.
   *
   * @return {Promise}
   */

  fetchAllCampaignsNotificationTypes: (params) => {
    return Campaign
      .aggregate([
        { $match : { profile : params?params._id:null } },
        { $group: { _id: '$_id' } }
      ])
      .exec()
      .then(data => {
        if(data) {
          const query = {
            campaign: { $in: data }
          };

          const convertedParams = strapi.utils.models.convertParams('notificationtypes', query);

          return Notificationtypes
            .find()
            .where(convertedParams.where)
            .sort(convertedParams.sort)
            .skip(convertedParams.start)
            .limit(convertedParams.limit);
          // .populate(_.keys(_.groupBy(_.reject(strapi.models.notificationtypes.associations, {autoPopulate: false}), 'alias')).join(' '));
        } else {
          return [];
        }
      });
  },

  /**
   * Promise to fetch notificationtypes by Campaign.
   *
   * @return {Promise}
   */

  fetchCampaignNotificationTypes: (params) => {
    const query = {
      campaign: params.id
    };
    const convertedParams = strapi.utils.models.convertParams('notificationtypes', query);

    return Notificationtypes
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit);
    // .populate(_.keys(_.groupBy(_.reject(strapi.models.notificationtypes.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch all notificationtypes.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    const convertedParams = strapi.utils.models.convertParams('notificationtypes', params);

    return Notificationtypes
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
    .populate(_.keys(_.groupBy(_.reject(strapi.models.notificationtypes.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch a/an notificationtypes.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return Notificationtypes
      .findOne(_.pick(params, _.keys(Notificationtypes.schema.paths)));
    // .populate(_.keys(_.groupBy(_.reject(strapi.models.notificationtypes.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an notificationtypes.
   *
   * @return {Promise}
   */

  add: async function (values){
    const data = await Notificationtypes.create(_.omit(values, _.keys(_.groupBy(strapi.models.notificationtypes.associations, 'alias'))));
    //await strapi.hook.mongoose.manageRelations('notificationtypes', _.merge(_.clone(data), { values }));
    return data;
  },

  /**
   * Promise to edit a/an notificationtypes.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
  //  await strapi.hook.mongoose.manageRelations('notificationtypes', _.merge(_.clone(params), { values }));
    return Notificationtypes.update(params, values, { multi: true });
  },

  /**
   * Promise to remove a/an notificationtypes.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Notificationtypes.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.notificationtypes.associations, {autoPopulate: false}), 'alias')).join(' '));

    _.forEach(Notificationtypes.associations, async association => {
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
