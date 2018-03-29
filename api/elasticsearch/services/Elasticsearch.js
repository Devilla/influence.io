'use strict';

/**
 * Elasticsearch.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {

  health : async () => {
    let client = strapi.es;
    return new Promise((resolve, reject)=> {
      client.cluster.health({}, function (err,resp,status) {
        if(err) reject(err);
        else resolve(resp);
        strapi.log.info('-- Client Health --',resp);
      });

    });

  },

  storeData : async (params) => {
    console.log('JSON',params);

    let body = {};
    body = {index: {_index: 'clientwebsitedata', _type:'logs'}};
    body.body = params.replace(/"(\w+)"\s*:/g, '$1:');
    console.log(body);
    let client = strapi.es;
    return new Promise((resolve,reject)=> {
      client.index({body: body}, function (err, resp,status) {
        if(err) reject(err);
        else resolve(resp);
        strapi.log.info('-- Client Response --', resp);
      });
    });
  }




};
