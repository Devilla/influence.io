'use strict';

/**
 * Client.js controller
 *
 * @description: A set of functions called "actions" for managing `Client`.
 */

module.exports = {

  /**
   * Retrieve client records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.client.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a client record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.client.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an client record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.client.add(ctx.request.body, ctx.state.user._id);
    // Send 201 `created`
    ctx.created(data);

  },

  /**
   * Update a/an client record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.client.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an client record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.client.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
