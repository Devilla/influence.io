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
    const formatter = msg;
    let message =  formatter + '\n';
    webSocketStream.write(message);
  }





};



