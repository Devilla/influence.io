'use strict';



/**
 * Email.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const _ = require('lodash');
const env = require('dotenv').config()
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
const template = require('../libs/template');

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

async function sendMail (mailOptions) {
  await transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      throw [{ messages: [{ id: 'Auth.form.error.email.invalid' }] }]
    } else {
      return info;
    }
  });
}
/**
 * Final Service Call From Here.
 * @param mailOptions
 * @returns {Promise<*>}
 */

//  async function sendEmail(mailOptions) {
//    let v;
//    try {
//      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//      v = await sgMail.send(mailOptions);
//    }catch (e) {
//      return e;
//    }
//    return v;
// }

/**
 * We should use this inside from the service.
 * @param options
 * @returns {Promise<*>}
 */

async function send(options) {
  options.from = options.from || '"Info Useinfluence" <info@useinfluence.co>';
  options.replyTo = options.replyTo || '"Info Useinfluence" <info@useinfluence.co>';
  options.text = options.text || options.html;
  options.html = options.html || options.text;

  let send;

  // Send the email.
  send = await sendMail(options);

  return send;

}

module.exports = {

  /**
   * We should use this outside from this as a service.
   * @param options
   * @returns {Promise<send>}
   */
  send: async (options) => {
      // Default values
    await send(options);
    return send;
  },

  /**
   * Final Account Created Template.
   * @param email
   * @param name
   * @returns {Promise<*>}
   */
  accountCreated: async (email, name, verificationToken) =>  {
      const mailSub = "Account has been created";
      const content =`
      This is a confirmation email to let you know that your account has been created.
      Please click the below to verify your account:

      Thanks for investing your faith in us.

      See you soon.

      Thanks!
      `;

      const body = "<pre style='font-size:12px;color:black'>" + content + "</pre><br/><br/><pre>Please click on the link below to login</pre><br/><br/><br/>";
      var button = `<a href="https://useinfluence.co/verify/${verificationToken}">
        <button type="button" style="color: white; background-color:#A3A3A3; border-radius: 4px; width: 180px; height: 46px; font-size: 14px; font-weight: bold; border-color: #22AAEE;">
          Verify
        </button>
      </a>`;

      var mytemp = template.commontemp(mailSub, name, body, button)

      let mailOptions = {
        from: 'noreply@useinfluence.co',
        to: email,
        subject: mailSub || 'Your Account has been created',
        html: mytemp
      };
      return send(mailOptions);
  },

  /**
   * Password Reset Email.
   * @param email
   * @param name
   * @param resetPasswordToken
   * @returns {Promise<*>}
   */
  resetPassword: async (email, name, resetPasswordToken) =>  {
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
      return send(mailOptions);
  },

  /**
   * Plan limit exceeded Template.
   * @param email
   * @param name
   * @param limit
   * @returns {Promise<*>}
   */
  limitExceeded: async (email, name, limit) =>  {
      const mailSub = `Account Limit ${limit} exceeded`;
      const content =`
      <td>Hello, ${name}</td>
      <br/>
      <td>This is a confirmation email to let you know that your account has exceeded the limit.</td>
      <br/>
      <td>For the time being your campaigns have been stopped</td>
      <br/>
      <td>Please click the below to upgrade your plan and continue:</td>
      <br/>
      <td>Thanks for investing your faith in us.</td>
      <br/>
      <td>See you soon.</td>
      <br/>
      <td>Thanks!</td>
      `;

      const body = "<tr style='font-size:12px;color:black'>" + content + "</tr><br/><br/><tr>Please click on the link below to login</tr><br/><br/><br/>";
      var button = `<a href="https://useinfluence.co/signup">
        <button type="button" style="color: white; background-color:#A3A3A3; border-radius: 4px; width: 180px; height: 46px; font-size: 14px; font-weight: bold; border-color: #22AAEE;">
          Upgrade
        </button>
      </a>`;

      var mytemp = template.commontemp(mailSub, name, body, button)

      let mailOptions = {
        from: 'noreply@useinfluence.co',
        to: email,
        subject: mailSub,
        html: mytemp
      };
      return send(mailOptions);
  }
};
