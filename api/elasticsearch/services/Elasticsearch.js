'use strict';

/**
 * Elasticsearch.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */
const elasticsearch = require('elasticsearch');


const client = elasticsearch.Client({
  host: strapi.config.elasticsearchNode,
  log: 'trace',
});


client.ping({
  requestTimeout: 1000
},function (error) {
  if(error){
    strapi.log.info('Elasticsearch has some problem but its okay ', error);

  }else {
    strapi.log.info('ES has started' );
  }

});

module.exports = {

  health : async () => {
    return new Promise((resolve, reject)=> {
      client.cluster.health({}, function (err,resp,status) {
        if(err) reject(err);
        else resolve(resp);
        strapi.log.info('-- Client Health --',resp);
      });

    });

  },


  searchWithQuery: async (index,q) => {
    return new Promise((resolve, reject)=> {
      client.search({index: index, q: q}, function (err,resp,status) {
        if (err) reject(err);
        else resolve(resp);
        strapi.log.info('---Client Search Returned--- ',resp);
      });
    });
  };





};
