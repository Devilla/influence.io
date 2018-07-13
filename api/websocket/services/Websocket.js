'use strict';

/**
 * `Websocket` service.
 */


const bunyan = require('bunyan');
const LoggingBunyan = require('@google-cloud/logging-bunyan').LoggingBunyan;


const loggingBunyan = new LoggingBunyan();

const logger = bunyan.createLogger({
  name: 'websocket-logging',
  streams: [
    {stream: process.stdout, level: 'info'},
    loggingBunyan.stream('info')
  ],
});

module.exports =  {
  /**
   * We are logging data to google cloud stackdriver and then  filebeats can pull it  and then sending it to logstash and thus to elasticsearch
   * @param msg
   */
  log : async function(msg) {
    const formatter = msg;
    let message =  formatter + '\n';
    console.log(message,'======message');
    logger.info(message);
    return msg;
  },

  health: () => {
    if (strapi.websocket){
      return true;
    } else {
      return false;
    }
  }
};
