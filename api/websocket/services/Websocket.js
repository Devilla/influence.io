'use strict';

/**
 * `Websocket` service.
 */


const fs = require('fs');

const webSocketStream = fs.createWriteStream('/tmp/log/websocket.log');

module.exports =  {


  log : (msg) => {
    let message = new Date().toISOString() + ': ' + msg + '\n';
    webSocketStream.write(message);
  }



};



