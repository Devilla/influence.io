'use strict';

/**
 * Webhooks.js controller
 *
 * @description: A set of functions called "actions" for managing `Webhooks`.
 */

module.exports = {

  /**
   * Retrieve webhooks records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const campaignId = ctx.params.campaignId;
    const data = await strapi.services.webhooks.fetchAll(campaignId);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a webhooks record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.webhooks.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an webhooks record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.webhooks.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Campture a/an webhooks record.
   *
   * @return {Object}
   */

  log: async (ctx) => {
    const data = await strapi.services.webhooks.log(ctx.params, ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an webhooks record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.webhooks.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an webhooks record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.webhooks.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
