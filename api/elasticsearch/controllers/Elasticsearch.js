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
    let data = await strapi.services.elasticsearch.health();


    ctx.send({
      message: data
    });
  },

  searchWithQuery: async(ctx) => {

    let index = 'filebeat-*';

    let query = ctx.query.trackingId;

    if (!ctx.query){
      ctx.send({
        message: 'invalid query if you want to send data using body use other query type'
      });
    }

    let data = await strapi.services.elasticsearch.searchWithQuery(index,query);

    ctx.send({
      message: data
    });
  },


    searchLiveUsers: async(ctx) => {

      let index = 'filebeat-*';

      let query = ctx.query.trackingId;

      if (!ctx.query){
        ctx.send({
          message: 'invalid query if you want to send data using body use other query type'
        });
      }

      let data = await strapi.services.elasticsearch.searchLiveUsers(index,query);

      ctx.send({
        message: data
      });
    },

};
