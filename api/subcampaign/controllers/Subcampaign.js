'use strict';

/**
 * Subcampaign.js controller
 *
 * @description: A set of functions called "actions" for managing `Subcampaign`.
 */

module.exports = {

  /**
   * Retrieve subcampaign records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.subcampaign.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a subcampaign record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.subcampaign.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an subcampaign record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.subcampaign.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an subcampaign record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.subcampaign.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an subcampaign record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.subcampaign.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
