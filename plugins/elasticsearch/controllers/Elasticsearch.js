'use strict';

/**
 * Elasticsearch.js controller
 *
 * @description: A set of functions called "actions" of the `elasticsearch` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  },

  health: async(ctx) =>{
    //Our logic

    //Send cluster health

    const data  = await strapi.plugins['elasticsearch'].services.elasticsearch.health();

    ctx.send({
      message: data
    });
  }
};
