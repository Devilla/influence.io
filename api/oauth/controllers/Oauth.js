'use strict';

/**
 * Oauth.js controller
 *
 * @description: A set of functions called "actions" for managing `Oauth`.
 */

module.exports = {

  /**
   * Retrieve oauth records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.oauth.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a oauth record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.oauth.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an oauth record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.oauth.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an oauth record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.oauth.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an oauth record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.oauth.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
