'use strict';

/**
 * State.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all states.
   *
   * @return {Promise}
   */

  fetchAll: async (params) => {
    const Users = await strapi.plugins['users-permissions'].services.user.fetchAll({});
    await Users.map(async user => {
      await Profile.findOne({user: user._id})
      .then(async profile => {
        const state = {
          past_state: {
            state: "User Created",
            created_at: new Date(),
            updated_at: new Date()
          },
          present_state: {
            state: "User Created",
            created_at: new Date(),
            updated_at: new Date()
          },
          future_state: {
            state: "Create Profile",
            created_at: new Date(),
            updated_at: new Date()
          },
          user: user._id,
          profile: profile._id
        };
        //Create new state for new user
        await strapi.api.state.services.state.add(state);
      });
    });
    // const convertedParams = strapi.utils.models.convertParams('state', params);
    //
    // return State
    //   .find()
    //   .where(convertedParams.where)
    //   .sort(convertedParams.sort)
    //   .skip(convertedParams.start)
    //   .limit(convertedParams.limit)
    //   .populate(_.keys(_.groupBy(_.reject(strapi.models.state.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch a/an state.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return State
      .findOne(_.pick(params, _.keys(State.schema.paths)))
      // .populate(_.keys(_.groupBy(_.reject(strapi.models.state.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an state.
   *
   * @return {Promise}
   */

  add: async (values) => {
    const data = await State.create(values);
    return data;
  },

  /**
   * Promise to edit a/an state.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    return State.update(params, values, { multi: true });
  },

  /**
   * Promise to remove a/an state.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await State.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.state.associations, {autoPopulate: false}), 'alias')).join(' '));

    _.forEach(State.associations, async association => {
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
