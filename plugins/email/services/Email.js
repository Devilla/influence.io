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
var template = require('../libs/template');

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  requiresAuth: true,
  auth: {
      user: "info@useinfluence.co",
      pass: "rXwEypHew8ic"
  },
  debug: true
});

var sendMail = function(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        reject([{ messages: [{ id: 'Auth.form.error.email.invalid' }] }]);
      } else {
        resolve();
      }
    });
  });
}

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
  },
  accountCreated: (email, name) =>  {
      const mailSub = "Account has been created"
      const content =`
      This is a confirmation email to let you know that your account has been created.
      
      Thanks for investing your faith in us.

      See you soon.

      Thanks!
      `;

      const body = "<pre style='font-size:12px;color:black'>" + content + "</pre><br/><br/><pre>Please click on the link below to login</pre><br/><br/><br/>";
      var button = `<a href="https://useinfluence.co/login">
        <button type="button" style="color: white; background-color:#A3A3A3; border-radius: 4px; width: 180px; height: 46px; font-size: 14px; font-weight: bold; border-color: #22AAEE;">
          Login
        </button>
      </a>`;

      var mytemp = template.commontemp(mailSub, name, body, button)

      let mailOptions = {
        from: 'noreply@useinfluence.co',
        to: email,
        subject: mailSub || 'Your Account has been created',
        html: mytemp
      };
      return sendMail(mailOptions);
  },
  resetPassword: (email, name, resetPasswordToken) =>  {
      const mailSub = "Reset Password"
      const content =`
      Please click here to set a new password for your account. If you’re unable to setup a new password please reply via this email and we’ll fix it for you.

      Thanks!
      `;

      const body = "<pre style='font-size:12px;color:black'>" + content + "</pre><br/><br/><pre>Please click on the button below to reset your password</pre><br/><br/><br/>";
      var button = `<a href="https://useinfluence.co/reset-password?code=${resetPasswordToken}">
        <button type="button" style="color: white; background-color:#A3A3A3; border-radius: 4px; width: 180px; height: 46px; font-size: 14px; font-weight: bold; border-color: #22AAEE;">
          Reset Password
        </button>
      </a>`;

      var mytemp = template.commontemp(mailSub, name, body, button)

      let mailOptions = {
        from: 'noreply@useinfluence.co',
        to: email,
        subject: mailSub || 'Your Account has been created',
        html: mytemp
      };
      return sendMail(mailOptions);
  }
};
