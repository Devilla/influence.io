'use strict';

/**
 * Subcampaign.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all subcampaigns.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    const convertedParams = strapi.utils.models.convertParams('subcampaign', params);

    return Subcampaign
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      // .populate(_.keys(_.groupBy(_.reject(strapi.models.subcampaign.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch a/an subcampaign.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return Subcampaign
      .findOne(_.pick(params, _.keys(Subcampaign.schema.paths)))
      .populate(_.keys(_.groupBy(_.reject(strapi.models.subcampaign.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an subcampaign.
   *
   * @return {Promise}
   */

  add: async (values) => {
    const data = await Subcampaign.create(values);
    return data;
  },

  /**
   * Promise to edit a/an subcampaign.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    const data = await Subcampaign.findOneAndUpdate(params, values, { multi: true });
    return Subcampaign.find({campaign: data.campaign});
  },

  /**
   * Promise to remove a/an subcampaign.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Subcampaign.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.subcampaign.associations, {autoPopulate: false}), 'alias')).join(' '));

    _.forEach(Subcampaign.associations, async association => {
      const search = (_.endsWith(association.nature, 'One')) ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
      const update = (_.endsWith(association.nature, 'One')) ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

      await strapi.models[association.model || association.collection].update(
        search,
        update,
        { multi: true });
    });


    return await Subcampaign.find({campaign: data.campaign.id});
  }
};
