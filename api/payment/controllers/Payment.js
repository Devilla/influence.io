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
    const user = ctx.state.user;
    const data = await strapi.services.payment.fetchAllUserPayments(user);

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
    ctx.send(data);
  },

  /**
   * Download payment invoice.
   *
   * @return {Buffer}
   */
  downloadInvoice: async (ctx) => {
    const data = await strapi.services.payment.downloadInvoice(ctx.state.user, ctx.params._id);

    // Send 200 `ok`
    ctx.send(data);
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
   * Upgrade a/an payment servicebot card details.
   *
   * @return {Object}
   */

  upgradeCard: async (ctx, next) => {
    const data = await strapi.services.payment.upgradeCard(ctx.state.user, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Cancel a/an payment subscription servicebot.
   *
   * @return {Object}
   */

  cancelSubscription: async (ctx, next) => {
    const data = await strapi.services.payment.cancelSubscription(ctx.state.user) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Delete a/an payment subscription servicebot.
   *
   * @return {Object}
   */

  deleteSubscription: async (ctx, next) => {
    const data = await strapi.services.payment.deleteSubscription(ctx.state.user) ;

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
