'use strict';

/**
 * Mail.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  send: async options => {
    return await strapi.mailer.sendMail(options);
  }
};