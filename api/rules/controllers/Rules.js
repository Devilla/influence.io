'use strict';

/**
 * Rules.js controller
 *
 * @description: A set of functions called "actions" for managing `Rules`.
 */

module.exports = {

  /**
   * Retrieve users rules records.
   *
   * @return {Object|Array}
   */

  findAllUserRules: async (ctx) => {
    const profile = ctx.state.user.profile;
    const data = await strapi.services.rules.fetchAllUserRules(profile);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve campaign rules records.
   *
   * @return {Object|Array}
   */

  findAllCampaignRules: async (ctx) => {
    const data = await strapi.services.rules.fetchAllCampaignRules(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve notificationtype rules records.
   *
   * @return {Object|Array}
   */

  findAllNotificationTypesRules: async (ctx) => {
    console.log(ctx, "==========");
    const data = await strapi.services.rules.fetchAllNotificationTypesRules(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve rules records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.rules.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a rules record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.rules.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an rules record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.rules.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an rules record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.rules.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an rules record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.rules.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
