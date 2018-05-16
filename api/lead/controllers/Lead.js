'use strict';

/**
 * Lead.js controller
 *
 * @description: A set of functions called "actions" for managing `Lead`.
 */

module.exports = {

  /**
   * Retrieve lead records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.lead.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve lead records.
   *
   * @return {Object|Array}
   */

  findRulesLead: async (ctx) => {

    const data = await strapi.services.lead.findRulesLead(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a lead record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.lead.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an lead record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.lead.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an lead record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.lead.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an lead record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.lead.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
