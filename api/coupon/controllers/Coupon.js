'use strict';

/**
 * Coupon.js controller
 *
 * @description: A set of functions called "actions" for managing `Coupon`.
 */

module.exports = {

  /**
   * Retrieve coupon records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.coupon.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a coupon record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.coupon.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an coupon record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.coupon.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an coupon record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.coupon.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an coupon record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.coupon.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
