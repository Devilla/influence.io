'use strict';

/**
 * Client.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const mongoose = require('mongoose');

module.exports = {

  /**
   * Promise to fetch all clients.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    const convertedParams = strapi.utils.models.convertParams('client', params);
    try {
      return Client
        .find()
        .where(convertedParams.where)
        .sort(convertedParams.sort)
        .skip(convertedParams.start)
        .limit(convertedParams.limit)
        .populate(_.keys(_.groupBy(_.reject(strapi.models.client.associations, {autoPopulate: false}), 'alias')).join(' '));
    } catch(err) {
      console.log(err);
    }
  },

  /**
   * Promise to fetch a/an client.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return Client
      .findOne(_.pick(params, _.keys(Client.schema.paths)))
      .populate(_.keys(_.groupBy(_.reject(strapi.models.client.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an client.
   *
   * @return {Promise}
   */

  add: async (values, user) => {
    values['user'] = user;
    var data = await Client.create(values);
    return data;
  },

  /**
   * Promise to edit a/an client.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    //await mongoose.manageRelations('client', _.merge(_.clone(params), { values }));
    return Client.update(params, values, { multi: true });
  },

  /**
   * Promise to remove a/an client.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Client.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.client.associations, {autoPopulate: false}), 'alias')).join(' '));

    _.forEach(Client.associations, async association => {
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
