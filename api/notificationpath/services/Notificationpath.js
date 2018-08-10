'use strict';

/**
 * Notificationpath.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

let validatePath = async function(index, trackingId, path, callback) {
 try {
   await strapi.services.elasticsearch.validatePath(index, trackingId, path).then(res=>{
     callback(null, res);
   });
 } catch(err) {
   callback(err);
 }
}

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

  findRulesPath: async (params) => {
    const query = {
      rule: params._id,
      type: params.type,
    };

    const convertedParams = strapi.utils.models.convertParams('notificationpath', query);

    const campaign = await Campaign.findOne({rule: params._id});

    let notificationPaths = await Notificationpath
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.notificationpath.associations, {autoPopulate: false}), 'alias')).join(' '));

    notificationPaths = await notificationPaths.map(async path => {
      return await validatePath('filebeat-*', campaign.trackingId, path.url, (err, pathResponse) => {
        if(pathResponse && pathResponse.hits && pathResponse.hits.total > 0) {
          Notificationpath.update({_id: path._id}, {$set:{status:'primary'}});
        }
      });
    })


    return await Notificationpath
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
    const campaign = await Campaign.findOne({rule: values.rule});
    let response;

    if(campaign)
      await validatePath('filebeat-*', campaign.trackingId, values.url, (err, pathResponse) => {
        if(!err)
          response = pathResponse;
      });

    if(response && response.hits && response.hits.total > 0)
      values['status'] = 'primary';
    else
      values['status'] = 'unverified';

    const data = await Notificationpath.create(values);
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
