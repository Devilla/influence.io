"use strict";

/**
 * `Websocket` service.
 */
const fs = require( "fs" );

const webSocketStream = fs.createWriteStream( "/tmp/log/websocket.log" );

module.exports = {
  /**
   * We are logging data to filebeats and then sending it to logstash and to elasticsearch
   * @param msg
   * Input : msg
   *
   * Output : formatted message
   */
    "log": ( msg ) => {
        const formatter = msg;
        let message = `${formatter }\n`;

        console.log( message, "======message" );
        webSocketStream.write( message );
    },


    "health": () => {
        if ( strapi.websocket ) {
            return true;
        }
        return false;
    
    }
};
