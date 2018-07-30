'use strict';

/**
 * Elasticsearch.js controller
 *
 * @description: A set of functions called "actions" for managing `Elasticsearch`.
 */

module.exports = {

  health: async(ctx) =>{
      //Our logic

    //Send cluster health
    let data = await strapi.services.elasticsearch.health();


    ctx.send({
      message: data
    });
  },

  query: async(ctx) => {

    let index = 'filebeat-*';

    let query = ctx.query.trackingId;

    if (!ctx.query){
      ctx.send({
        message: 'invalid query if you want to send data using body use other query type'
      });
    }

    let data = await strapi.services.elasticsearch.query(index,query);

    ctx.send({
      message: data
    });
  },

  notification: async(ctx) => {

    let index = 'filebeat-*';
    let trackingId = ctx.params._id;
    let type = ctx.query.type;

    if (!ctx.params){
      ctx.send({
        message: 'invalid params if you want to send data using body use other params type'
      });
    }

    const host = ctx.request.header.origin?
      ctx.request.header.origin.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]
    :
      ctx.request.header.referer?
        ctx.request.header.referer.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0].replace("/", "")
      :
        null;

    let data = await strapi.services.elasticsearch.notification(index, trackingId, type, false, host);

    ctx.send({
      message: data
    });
  },

  uniqueUsers: async(ctx) => {

    let index = 'filebeat-*';
    let trackingId = ctx.params._id;
    let type = ctx.query.type;

    if (!ctx.params){
      ctx.send({
        message: 'invalid params if you want to send data using body use other params type'
      });
    }

    let data = await strapi.services.elasticsearch.uniqueUsersWeekly(index, trackingId);

    ctx.send({
      message: data
    });
  }

};
