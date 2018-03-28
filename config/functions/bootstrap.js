'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
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
    strapi.log.info('Elasticsearch has some problem', error);

  }else {
    strapi.log.info('ES has started ' );
  }

});


module.exports = async cb => {
  // const pluginStore = strapi.store({
  //   environment: strapi.config.environment,
  //   type: 'plugin',
  //   name: 'elasticsearch'
  // });
  //
  // if (!await pluginStore.get({key: 'application'})) {
  //   const value = {
  //     name: 'ElasticSearch',
  //     description: 'This API is going to be awesome with elasticsearch!'
  //   };
  //
  //   await pluginStore.set({key: 'elasticsearch', value});
  // }

  /**
   * Right now as we dont have time we are going by hardcoding everything because UI needs to be prepared
   * When we have good time we can simply use the above method
   */
  /**
   * Start the elasticSearch and use it everywhere.
   */


  strapi.es = client;

  cb();

};
