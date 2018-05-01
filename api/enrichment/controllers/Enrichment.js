'use strict';

/**
 * Enrichment.js controller
 *
 * @description: A set of functions called "actions" for managing `Enrichment`.
 */

module.exports = {

  /**
   * Retrieve picasaWeb record.
   *
   * @return {Object|Array}
   */

  picasaWeb: async (ctx) => {

    const data = await strapi.services.enrichment.picasaWeb(ctx.params.email);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a gravatr record.
   *
   * @return {Object}
   */

  gravatr: async (ctx) => {

    const data = await strapi.services.enrichment.gravatr(ctx.params.email);

    // Send 200 `ok`
    ctx.send(data);
  }
};
