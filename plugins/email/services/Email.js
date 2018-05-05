'use strict';

/**
 * Email.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const _ = require('lodash');
// const sendmail = require('sendmail')({
//   silent: true
// });

const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport.
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  requiresAuth: true,
  auth: {
      user: "info@useinfluence.co", // generated ethereal user
      pass: "rXwEypHew8ic" // generated ethereal password
  },
  debug: true
});

module.exports = {
  send: (options, cb) => {
    return new Promise((resolve, reject) => {
      // Default values.
      options = _.isObject(options) ? options : {};
      options.from = options.from || '"Info Useinfluence" <info@useinfluence.co>';
      options.replyTo = options.replyTo || '"Info Useinfluence" <info@useinfluence.co>';
      options.text = options.text || options.html;
      options.html = options.html || options.text;

      // Send the email.
      transporter.sendMail({
        from: options.from,
        to: options.to,
        replyTo: options.replyTo,
        subject: options.subject,
        text: options.text,
        html: options.html
      }, function (err, info) {
        if (err) {
          reject([{ messages: [{ id: 'Auth.form.error.email.invalid' }] }]);
        } else {
          resolve();
        }
      });
    });
  }
};
