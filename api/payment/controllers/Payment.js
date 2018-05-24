'use strict';

/**
 * Payment.js controller
 *
 * @description: A set of functions called "actions" for managing `Payment`.
 */

module.exports = {

  /**
   * Retrieve all user payment records.
   *
   * @return {Object|Array}
   */

  findAllUserPayments: async (ctx) => {
    const profile = ctx.state.user.profile;
    const data = await strapi.services.payment.fetchAllUserPayments(profile);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve all plan payment records.
   *
   * @return {Object|Array}
   */

  findAllPlanPayments: async (ctx) => {
    const data = await strapi.services.payment.fetchAllPlanPayments(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve payment invoices.
   *
   * @return {Object|Array}
   */
  findUsersInvoice: async (ctx) => {
    const data = await strapi.services.payment.userInvoices(ctx.state.user);

    // Send 200 `ok`
    ctx.created(data);
  },

  /**
   * Retrieve payment records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.payment.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a payment record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.payment.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an payment record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.payment.add(ctx.state.user, ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an payment record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.payment.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an payment record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.payment.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
