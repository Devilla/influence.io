'use strict';

/**
 * State.js controller
 *
 * @description: A set of functions called "actions" for managing `State`.
 */

module.exports = {

  /**
   * Retrieve state records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.state.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a state record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.state.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an state record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.state.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an state record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.state.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an state record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.state.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
