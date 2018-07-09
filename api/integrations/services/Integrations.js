'use strict';
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

/**
 * Integrations.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

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
   * Promise to GoogleOauth for integrations.
   *
   * @return {Promise}
   */

  passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/integrations/auth/google/callback',
    passReqToCallback: true,
    proxy: true
  }, (connect, accessToken, refreshToken, profile, done) => {
    console.log(accessToken + '+++++++++++++++++++++++');
    console.log(profile.name.givenName + ' ' + profile.name.familyName);
  }));



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
