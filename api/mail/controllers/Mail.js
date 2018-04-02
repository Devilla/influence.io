'use strict';

/**
 Mail.js controller
 *
 * @description: A set of functions called "actions" for managing `Mail`.
 */


module.exports = {
  registered: async (email, verificationLink) => {
    return await strapi.services.mail.send({
      from: strapi.config.mail.sender,
      to: email,
      subject: 'Register at useinfluence',
      text: `Please visit http://userinfluence.co/verify/${verificationLink} to continue registration.`
    });
  },

};