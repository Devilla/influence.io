'use strict';

/**
 * Token.js controller
 *
 * @description: A set of functions called "actions" for managing `Token`.
 */

module.exports = {

  /**
   * Retrieve token records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.token.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a token record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.token.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an token record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.token.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an token record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.token.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an token record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.token.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
