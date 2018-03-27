'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */

const Websocket = require('ws');

module.exports = cb => {
  const wss = new Websocket.Server({server: strapi.server, path: strapi.config.socketsServerPath});

  // listen for user connection
  wss.on('connection', function(ws){
    console.log('Socket user connected!');
    
    // listen for user diconnect
    ws.on('disconnect', () => console.log('Socket user disconnected!'));
  });
  
  strapi.wss = wss; // register websockets inside strapi main object to use it globally anywhere
  
  cb();
};
