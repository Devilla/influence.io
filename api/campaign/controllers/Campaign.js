'use strict';

/**
 * Campaign.js controller
 *
 * @description: A set of functions called "actions" for managing `Campaign`.
 */

module.exports = {

  /**
   * Retrieve user campaign records.
   *
   * @return {Object|Array}
   */

  findUserCampaigns: async (ctx) => {
    const user = ctx.state.user;
    const data = await strapi.services.campaign.fetchUserCampaigns(user._id);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve campaign records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.campaign.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a campaign record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.campaign.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a campaign record with tracking id.
   *
   * @return {Object}
   */

  findOneTrackingId: async (ctx) => {
    // if (!ctx.params.trackingId.match(/^[0-9a-fA-F]{24}$/)) {
    //   return ctx.notFound();
    // }

    const data = await strapi.services.campaign.fetchTrackingId(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an campaign record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.campaign.add(ctx.request.body);
    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an campaign record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.campaign.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an campaign record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.campaign.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve user's campaign info.
   *
   * @return {Object|Array}
   */

  findUserCampaignsInfo: async (ctx) => {
    const user = ctx.state.user;
    const host = ctx.request.header.host;
    const data = await strapi.services.campaign.fetchUserCampaignsInfo(user._id, host);

    // Send 200 `ok`
    ctx.send(data);
  },
};
