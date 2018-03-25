'use strict';

/**
 * Plan.js controller
 *
 * @description: A set of functions called "actions" for managing `Plan`.
 */

module.exports = {

  /**
   * Retrieve plan records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.plan.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a plan record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.plan.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an plan record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.plan.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an plan record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.plan.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an plan record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.plan.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
