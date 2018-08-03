'use strict';

/**
 * Configuration.js controller
 *
 * @description: A set of functions called "actions" for managing `Configuration`.
 */

module.exports = {

  /**
   * Retrieve configuration records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const profile = ctx.state.user.profile;
    const data = await strapi.services.configuration.fetchAll(profile);

    // Send 200 `ok`
    ctx.send(data);
  },

  findCampaignConfig: async (ctx) => {
    if (!ctx.params.notifId.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }
    if (!ctx.params.campId.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.configuration.fetchOneConfig(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a configuration record.
   *
   * @return {Object}
   */

  findCampaign: async (ctx) => {
    if (!ctx.params.campId.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.configuration.fetchCampaign(ctx.params);
    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an configuration record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.configuration.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an configuration record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.configuration.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an configuration record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.configuration.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
