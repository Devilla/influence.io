'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */

const Websocket = require('ws');
var events = require('events');
var eventEmitter = new events.EventEmitter();


module.exports = cb => {
  const wsServer = new Websocket.Server({server: strapi.server, path: strapi.config.socketsServerPath});

  const eventHandler = function() {
    wsServer.on('connection', function(ws){
      console.log('Socket user connected!');
      ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        strapi.message = message;
        console.log("Here is the message",strapi.message);
        /
        //Send message to ES
      });
      // listen for user diconnect
      ws.on('disconnect', () => console.log('Socket user disconnected!'));
    });
  };

  eventHandler();

  /**
   * Pass the data from here
   *
   */


  strapi.websocket = wsServer;

  cb();
};
