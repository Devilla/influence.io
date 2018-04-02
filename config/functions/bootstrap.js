'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */
const elasticsearch = require('elasticsearch');
const Websocket = require('ws');


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
    strapi.log.info('ES has started ' );
  }

});

client.indices.get({
  index: 'clientwebsitedata',
},function (err, resp, status) {
  if(err) {
    strapi.log.info(err);
    //
    createIndex();
    //define Mappin
  }else {
    strapi.log.info('get', resp);
  }
});

function createIndex() {
  client.indices.create({
    index: 'clientwebsitedata',
    type: 'logs'
  },function(err,resp,status) {
    if(err) {
      console.log(err);
    }
    else {
      console.log('create',resp);
    }
  });
}

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

  //Create index if does not exist

  //Get client





  const wsServer = new Websocket.Server({server: strapi.server, path: strapi.config.socketsServerPath});

  function noop() {}

  function heartbeat() {
    this.isAlive = true;
  }

  const eventHandler = function() {
    wsServer.on('connection', function(ws){
      ws.isAlive = true;
      ws.on('pong', heartbeat);
      strapi.log.info('Socket user/s connected!');
      ws.on('message', function incoming(message) {
        strapi.log.info('received: %s', message);
        //trueLog(message);
        strapi.services.websocket.log(message);
      });
      // listen for user diconnect
      ws.on('disconnect', () => console.log('Socket user disconnected!'));
    });
    const interval = setInterval(function ping() {
      wsServer.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();
        ws.isAlive = false;
        ws.ping(noop);
      });
    }, 30000);
  };

  eventHandler();


  strapi.es = client;

  strapi.websocket = wsServer;


  cb();

};
>>>>>>> ES1
