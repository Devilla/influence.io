'use strict';

/**
 * Notificationpath.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all notificationpaths.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    const convertedParams = strapi.utils.models.convertParams('notificationpath', params);

    return Notificationpath
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.notificationpath.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch all rules notificationpaths.
   *
   * @return {Promise}
   */

  findRulesPath: (params) => {
    const query = {
      rule: params._id,
      type: params.type,
    };

    const convertedParams = strapi.utils.models.convertParams('notificationpath', query);

    return Notificationpath
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.notificationpath.associations, {autoPopulate: false}), 'alias')).join(' '));
  },
  /**
   * Promise to fetch a/an notificationpath.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return Notificationpath
      .findOne(_.pick(params, _.keys(Notificationpath.schema.paths)))
      .populate(_.keys(_.groupBy(_.reject(strapi.models.notificationpath.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an notificationpath.
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

    var response = await checkDomain
    .then((result) => {
      return result;
    })
    .catch(err => {
      return {error: true, message: "Invalid domain"};
    });
    const data = await Notificationpath.create(response);
    return data;
  },

  /**
   * Promise to edit a/an notificationpath.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    //await strapi.hook.mongoose.manageRelations('notificationpath', _.merge(_.clone(params), { values }));
    return Notificationpath.update(params, values, { multi: true });
  },

  /**
   * Promise to remove a/an notificationpath.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Notificationpath.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.notificationpath.associations, {autoPopulate: false}), 'alias')).join(' '));

    _.forEach(Notificationpath.associations, async association => {
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
