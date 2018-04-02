'use strict';

/**
 * Notificationtypes.js controller
 *
 * @description: A set of functions called "actions" for managing `Notificationtypes`.
 */

module.exports = {

  /**
   * Retrieve all campaigns notificationtypes records.
   *
   * @return {Object|Array}
   */

  findCampaignsNotificationTypes: async (ctx) => {
    const profile = ctx.state.user.profile;
    const data = await strapi.services.notificationtypes.fetchAllCampaignsNotificationTypes(profile);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve user notificationtypes records.
   *
   * @return {Object|Array}
   */

  findCampaignNotificationTypes: async (ctx) => {
    const data = await strapi.services.notificationtypes.fetchCampaignNotificationTypes(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve notificationtypes records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.notificationtypes.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a notificationtypes record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.notificationtypes.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an notificationtypes record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.notificationtypes.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an notificationtypes record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.notificationtypes.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an notificationtypes record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.notificationtypes.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
