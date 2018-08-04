'use strict';

/**
 * Subdomain.js controller
 *
 * @description: A set of functions called "actions" for managing `Subdomain`.
 */

module.exports = {

  /**
   * Retrieve subdomain records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.subdomain.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a subdomain record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.subdomain.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an subdomain record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.subdomain.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an subdomain record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.subdomain.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an subdomain record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.subdomain.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
