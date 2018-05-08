'use strict';

/**
 * Profile.js controller
 *
 * @description: A set of functions called "actions" for managing `Profile`.
 */

module.exports = {

  /**
   * Retrieve user profile records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const user = ctx.state.user;
    const data = await strapi.services.profile.fetchUserProfile(user);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve profile records.
   *
   * @return {Object|Array}
   */

  findAll: async (ctx) => {
    const data = await strapi.services.profile.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a profile record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.profile.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an profile record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.profile.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an profile record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.profile.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an profile record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.profile.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
