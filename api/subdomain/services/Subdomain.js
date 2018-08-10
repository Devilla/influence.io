'use strict';

/**
 * Subdomain.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all subdomains.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    const convertedParams = strapi.utils.models.convertParams('subdomain', params);

    return Subdomain
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.subdomain.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch a/an subdomain.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return Subdomain
      .findOne(_.pick(params, _.keys(Subdomain.schema.paths)))
      .populate(_.keys(_.groupBy(_.reject(strapi.models.subdomain.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an subdomain.
   *
   * @return {Promise}
   */

  add: async (values) => {
    values.domainUrl = values.domainUrl.toLowerCase().replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
    const data = await Subdomain.create(values);
    const result = await Subdomain.find({campaign: data.campaign});
    return result;
  },

  /**
   * Promise to edit a/an subdomain.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    // await strapi.hook.mongoose.manageRelations('subdomain', _.merge(_.clone(params), { values }));
    return Subdomain.update(params, values, { multi: true });
  },

  /**
   * Promise to remove a/an subdomain.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Subdomain.findOneAndRemove(params, {});

    return data;
  }
};
