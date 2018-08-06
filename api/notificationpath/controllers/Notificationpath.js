'use strict';

/**
 * Notificationpath.js controller
 *
 * @description: A set of functions called "actions" for managing `Notificationpath`.
 */

module.exports = {

  /**
   * Retrieve notificationpath records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.notificationpath.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve rules notificationpath records.
   *
   * @return {Object|Array}
   */

  findRulesPath: async (ctx) => {
    const data = await strapi.services.notificationpath.findRulesPath(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a notificationpath record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.notificationpath.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an notificationpath record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    console.log(ctx,'=========response from create');
    const data = await strapi.services.notificationpath.add(ctx.request.body);

    console.log(data,'=========response from add');
    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an notificationpath record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.notificationpath.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an notificationpath record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.notificationpath.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
