'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */

const Websocket = require('ws');


module.exports = async cb => {

  const wsServer = new Websocket.Server({server: strapi.server, path: strapi.config.socketsServerPath});

  function noop() {}

  function heartbeat() {
    return true;
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
  strapi.websocket = wsServer;
  cb();

};
