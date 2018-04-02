'use strict';

/**
 * `Websocket` service.
 */


const fs = require('fs');

const webSocketStream = fs.createWriteStream('/tmp/log/websocket.log');

module.exports =  {

  /**
   * We are logging data to filebeats and then sending it to logstash and to elasticsearch
   * @param msg
   */
  log : (msg) => {
    let message = new Date().toISOString() + ': ' + msg + '\n';
    webSocketStream.write(message);
  }





};



