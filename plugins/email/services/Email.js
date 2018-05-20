'use strict';



/**
 * Email.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const _ = require('lodash');
const env = require('dotenv').config()
// const sendmail = require('sendmail')({
//   silent: true
// });
const sgMail = require('@sendgrid/mail');



const template = require('../libs/template');


/**
 * Final Service Call From Here.
 * @param mailOptions
 * @returns {Promise<*>}
 */

 async function sendEmail(mailOptions) {
    
   let v;
   try {

     sgMail.setApiKey(process.env.SENDGRID_API_KEY);

     v = await sgMail.send(mailOptions);

   }catch (e) {
     return e;
   }

   return v;


}

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
  send = await sendEmail(options);

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
  accountCreated: async (email, name) =>  {
      const mailSub = "Account has been created";
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
  }
};

