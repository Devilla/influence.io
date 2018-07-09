'use strict';
/**
 * Integrations.js controller
 *
 * @description: A set of functions called "actions" for managing `Integrations`.
 */

module.exports = {

  /**
   * Retrieve integrations records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.integrations.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },


  /**
   * Retrieve integrations GoogleOauth.
   *
   * @return {Object|Array}
   */

  GoogleOauth: async (ctx) => {
    const data = await strapi.services.integrations.googleOauth(ctx.query);
    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a integrations record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.integrations.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an integrations record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.integrations.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an integrations record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.integrations.edit(ctx.params, ctx.request.body);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an integrations record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.integrations.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};