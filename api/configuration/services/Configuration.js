'use strict';

/**
 * Configuration.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all configurations.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    const query = {
      profile: params?params._id:null
    };
    const convertedParams = strapi.utils.models.convertParams('configuration', query);

    return Configuration
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.configuration.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch one campaign configurations.
   *
   * @return {Promise}
   */

  fetchOneConfig: (params) => {
    const query = {
      campaign: params?params.campId:null,
      notificationType: params?params.notifId:null
    };
    const convertedParams = strapi.utils.models.convertParams('configuration', query);

    return Configuration
      .findOne()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.configuration.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch a/an configuration.
   *
   * @return {Promise}
   */

  fetchCampaign: (params) => {
    const query = {
      campaign: params?params.campId:null,
    };
    const convertedParams = strapi.utils.models.convertParams('configuration', query);

    return Configuration
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.configuration.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an configuration.
   *
   * @return {Promise}
   */

  add: async (values) => {
    const data = await Configuration.create(_.omit(values, _.keys(_.groupBy(strapi.models.configuration.associations, 'alias'))));
    //await strapi.hook.mongoose.manageRelations('configuration', _.merge(_.clone(data), { values }));
    return data;
  },

  /**
   * Promise to edit a/an configuration.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    // await strapi.hook.mongoose.manageRelations('configuration', _.merge(_.clone(params), { values }));
    return Configuration.update(params, values, { multi: true });
  },

  /**
   * Promise to remove a/an configuration.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Configuration.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.configuration.associations, {autoPopulate: false}), 'alias')).join(' '));

    _.forEach(Configuration.associations, async association => {
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
