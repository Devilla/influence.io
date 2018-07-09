'use strict';

/**
 * Integrations.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const request = require('request');

// Purest strategies.
const Purest = require('purest');

module.exports = {

  /**
   * Promise to fetch all integrations.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    const convertedParams = strapi.utils.models.convertParams('integrations', params);

    return Integrations
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.integrations.associations, {
        autoPopulate: false
      }), 'alias')).join(' '));
  },


  /**
   * Promise to fetch all integrations.
   *
   * @return {Promise}
   */

  googleOauth: (params) => {
    const convertedParams = strapi.utils.models.convertParams('integrations', params);

    return Integrations
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.integrations.associations, {
        autoPopulate: false
      }), 'alias')).join(' '));


    const getProfile = async (provider, query, callback) => {
      const access_token = query.access_token ||  query.code || query.oauth_token;

      const grant = await strapi.store({
        environment: '',
        type: 'plugin',
        name: 'users-permissions',
        key: 'grant'
      }).get();

      switch (provider) {
        case 'facebook':
          const facebook = new Purest({
            provider: 'facebook'
          });

          facebook.query().get('me?fields=name,email').auth(access_token).request((err, res, body) => {
            if (err) {
              callback(err);
            } else {
              callback(null, {
                username: body.name,
                email: body.email
              });
            }
          });
          break;
        case 'google':
          const google = new Purest({
            provider: 'google'
          });

          google.query('plus').get('people/me').auth(access_token).request((err, res, body) => {
            console.log(err, body, "=======google body");
            if (err) {
              callback(err);
            } else {
              callback(null, {
                username: body.displayName || body.emails[0].value,
                email: body.emails[0].value
              });
            }
          });

          google.query('maps').get('people/me').auth(access_token).request((err, res, body) => {
            console.log(err, body, "=======google body");
            if (err) {
              callback(err);
            } else {
              callback(null, {
                username: body.displayName || body.emails[0].value,
                email: body.emails[0].value
              });
            }
          });
          break;
        default:
          callback({
            message: 'Unknown provider.'
          });
          break;
      }
    }
  },


  /**
   * Promise to fetch a/an integrations.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return Integrations
      .findOne(_.pick(params, _.keys(Integrations.schema.paths)))
      .populate(_.keys(_.groupBy(_.reject(strapi.models.integrations.associations, {
        autoPopulate: false
      }), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an integrations.
   *
   * @return {Promise}
   */

  add: async (values) => {
    const data = await Integrations.create(_.omit(values, _.keys(_.groupBy(strapi.models.integrations.associations, 'alias'))));
    await strapi.hook.mongoose.manageRelations('integrations', _.merge(_.clone(data), {
      values
    }));
    return data;
  },

  /**
   * Promise to edit a/an integrations.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    await strapi.hook.mongoose.manageRelations('integrations', _.merge(_.clone(params), {
      values
    }));
    return Integrations.update(params, values, {
      multi: true
    });
  },

  /**
   * Promise to remove a/an integrations.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Integrations.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.integrations.associations, {
        autoPopulate: false
      }), 'alias')).join(' '));

    _.forEach(Integrations.associations, async association => {
      const search = (_.endsWith(association.nature, 'One')) ? {
        [association.via]: data._id
      } : {
        [association.via]: {
          $in: [data._id]
        }
      };
      const update = (_.endsWith(association.nature, 'One')) ? {
        [association.via]: null
      } : {
        $pull: {
          [association.via]: data._id
        }
      };

      await strapi.models[association.model || association.collection].update(
        search,
        update, {
          multi: true
        });
    });

    return data;
  }
};