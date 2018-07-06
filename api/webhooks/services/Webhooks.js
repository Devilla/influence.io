'use strict';

/**
 * Webhooks.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all webhooks.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    const convertedParams = strapi.utils.models.convertParams('campaignId', params);

    return Webhooks
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.webhooks.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch a/an webhooks.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return Webhooks
      .findOne(_.pick(params, _.keys(Webhooks.schema.paths)))
      .populate(_.keys(_.groupBy(_.reject(strapi.models.webhooks.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an webhooks.
   *
   * @return {Promise}
   */

  add: async (values) => {
    const data = await Webhooks.create(_.omit(values, _.keys(_.groupBy(strapi.models.webhooks.associations, 'alias'))));
    await strapi.hook.mongoose.manageRelations('webhooks', _.merge(_.clone(data), { values }));
    return data;
  },

  /**
   * Promise to add a/an log to es.
   *
   * @return {Promise}
   */

  log: async (query, values) => {
    return await strapi.api.websocket.services.websocket.log(data);
  },

  /**
   * Promise to edit a/an webhooks.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    await strapi.hook.mongoose.manageRelations('webhooks', _.merge(_.clone(params), { values }));
    return Webhooks.update(params, values, { multi: true });
  },

  /**
   * Promise to remove a/an webhooks.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Webhooks.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.webhooks.associations, {autoPopulate: false}), 'alias')).join(' '));

    _.forEach(Webhooks.associations, async association => {
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
