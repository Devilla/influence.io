'use strict';

/**
 * Webhooks.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const genGuid = function() {
    var s4 = function() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

module.exports = {

  /**
   * Promise to fetch all webhooks.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    return Webhooks.find({campaign: params});
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
    const data = await Webhooks.create(values);
    return data;
  },

  /**
   * Promise to add a/an log to es.
   *
   * @return {Promise}
   */

  log: async (query, values) => {
    console.log(query, values, '===============log data');
    const data = {
      "path": "/visitors/events/",
      "value": {
        "fingerprint": "a425aff7a248d252b013ac983a6320e6",
        "sessionId": genGuid(),
        "visitorId": genGuid(),
        "trackingId": query.trackingId,
        "userId": null,
        "userProfile": null,
        "form": {
          "email": values.email,
          "name": values.name || values.username || values.firstname
        },
        "geo": {
          "latitude": values.latitude,
          "longitude": values.longitude,
          "city": values.city,
          "country": values.country,
          "ip": values.ip
        },
        "timestamp": Date.now(),
        "event": "formsubmit",
        "source": {
          "url": {
            "host": values.host,
            "hostname": values.host,
            "pathname": "/webhooks"
          }
        },
        "target": {
          "url": {
            "host": values.host,
            "hostname": values.host
          }
        }
      }
    };

    await strapi.api.websocket.services.websocket.log(JSON.stringify(data));
    return { message: 'logs added', error: false };
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
    //await strapi.hook.mongoose.manageRelations('webhooks', _.merge(_.clone(params), { values }));
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
