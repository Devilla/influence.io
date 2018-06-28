'use strict';

/**
 * Code.js controller
 *
 * @description: A set of functions called "actions" for managing `Code`.
 */

module.exports = {

  /**
   * Retrieve code records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.code.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a code record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.code.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an code record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.code.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an code record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.code.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an code record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.code.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
