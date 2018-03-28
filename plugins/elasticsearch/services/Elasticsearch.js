'use strict';

/**
 * Elasticsearch.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {

  health : async() => {
    let client = strapi.es;
    client.cluster.health({}, function (err,resp,status) {
      strapi.log.info('-- Client Health --',resp);
    });
  }



    
};
