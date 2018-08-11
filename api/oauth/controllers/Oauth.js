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

  authorization: async (ctx) => {
    const clientId = ctx.query.clientId;
    const redirectUri = ctx.query.redirectUri;
    const data = await strapi.services.oauth.authorization(clientId, redirectUri);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a oauth record.
   *
   * @return {Object}
   */

  decision: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.oauth.decision(ctx.request.body);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an oauth record.
   *
   * @return {Object}
   */

  token: async (ctx) => {
    const data = await strapi.services.oauth.token(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

};
