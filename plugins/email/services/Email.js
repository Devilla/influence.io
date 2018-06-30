'use strict';



/**
 * Email.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const _ = require('lodash');
const env = require('dotenv').config()
const sgMail = require('@sendgrid/mail');
const template = require('../libs/template');

/**
 * Final Service Call From Here.
 * @param mailOptions
 * @returns {Promise<*>}
 */

 async function sendMail(mailOptions) {
   let v;
   try {
     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
     v = await sgMail.send(mailOptions);
   } catch (e) {
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
  options.from = options.from || '"Support Useinfluence" <support@useinfluence.co>';
  options.replyTo = options.replyTo || '"Support Useinfluence" <support@useinfluence.co>';
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
        <br/>
        <span>This is a confirmation email to let you know that your account has been created.</span>
        <br/>
        <span>Please click the below to verify your account:</span>
        <br/>
        <a href="https://useinfluence.co/verify/${verificationToken}">
          <button type="button" style="color: white; margin: 20px 2px;  background-color:#097fff; border-radius: 4px; width: 100%; height: 46px; font-size: 14px; font-weight: bold;">
            Verify
          </button>
        </a>
        <br/>
        <span>Thanks for investing your faith in us.</span>
        <br/>
        <span>See you soon.</span>
        <br/>
        <span>Thanks!</span>
      `;

      var mytemp = template.commontemp(mailSub, name, content);

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
        <br/>
        <span>
          Please click here to set a new password for your account. If you’re unable to setup a new password please reply via this email and we’ll fix it for you.
        </span>
        <a href="https://useinfluence.co/reset-password?code=${resetPasswordToken}">
          <button type="button" style="color: white; margin: 20px 2px; background-color:#097fff; border-radius: 4px; width: 100%; height: 46px; font-size: 14px; font-weight: bold;">
            Reset Password
          </button>
        </a>
        <span>Thanks!</span>
        <br/>
      `;

      var mytemp = template.commontemp(mailSub, name, content);

      let mailOptions = {
        from: 'support@useinfluence.co',
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
        <br/>
        <span>This is a confirmation email to let you know that your account has exceeded the limit.</span>
        <br/>
        <span>For the time being your campaigns have been stopped</span>
        <br/>
        <span>Please click the below to upgrade your plan and continue:</span>
        <br/>
        <a href="https://useinfluence.co/signup">
          <button type="button" style="color: white; margin: 20px 2px; background-color:#097fff; border-radius: 4px; width: 100%; height: 46px; font-size: 14px; font-weight: bold;">
            Upgrade
          </button>
        </a>
        <br/>
        <span>Thanks for investing your faith in us.</span>
        <br/>
        <span>See you soon.</span>
        <br/>
        <span>Thanks!</span>
      `;

      var mytemp = template.commontemp(mailSub, name, content);

      let mailOptions = {
        from: 'noreply@useinfluence.co',
        to: email,
        subject: mailSub,
        html: mytemp
      };
      return send(mailOptions);
  },

  /**
   * Demo Page Template.
   * @param query
   * @returns {Promise<*>}
   */
  demoRequested: async (query) =>  {
    const email = query.email;
    const firstname = query.firstname;
    const lastname = query.lastname;
    const phonenumber = query.phonenumber;
    const mailSub = "Demo requested";
    const content =`
      <br/>
      <span>This is a confirmation email to let you know that ${firstname} have request for demo.</span>
      <br/>
      <span>First Name: ${firstname}</span>
      <br/>
      <span>Last Name: ${lastname}</span>
      <br/>
      <span>Email: ${email}</span>
      <br/>
      <span>Phone Number: ${phonenumber}</span>
      <br/>
      <span>Please click the below to get the demo:</span>
      <br/>
      <a href="https://useinfluence.co/">
        <button type="button" style="color: white; margin: 20px 2px;  background-color:#097fff; border-radius: 4px; width: 100%; height: 46px; font-size: 14px; font-weight: bold;">
          Demo
        </button>
      </a>
      <br/>
      <span>Thanks for investing your faith in us.</span>
      <br/>
      <span>See you soon.</span>
      <br/>
      <span>Thanks!</span>
    `;

    var mytemp = template.commontemp(mailSub, name, content);

    let mailOptions = {
      from: 'support@useinfluence.co',
      to: 'useinfluencecosupport@useinfluence.freshdesk.com',
      subject: mailSub,
      html: mytemp
    };
    return send(mailOptions);
  },

  /**
   * Affiliate Page Template.
   * @param query
   * @returns {Promise<*>}
   */
  affiliateRegister: async (query) =>  {
    const email = query.email;
    const name = query.name;
    const mailSub = "Affiliate Registeration";
    const content =`
      <br/>
      <span>This is a confirmation email to let you know that ${name} have register for Affiliate.</span>
      <br/>
      <span>Email Address: ${email}</span>
      <span>Please click the below to login:</span>
      <br/>
      <a href="https://useinfluence.co/login">
        <button type="button" style="color: white; margin: 20px 2px;  background-color:#097fff; border-radius: 4px; width: 100%; height: 46px; font-size: 14px; font-weight: bold;">
          Demo
        </button>
      </a>
      <br/>
      <span>Thanks for investing your faith in us.</span>
      <br/>
      <span>See you soon.</span>
      <br/>
      <span>Thanks!</span>
    `;

    var mytemp = template.commontemp(mailSub, name, content);

    let mailOptions = {
      from: 'support@useinfluence.co',
      to: 'useinfluencecosupport@useinfluence.freshdesk.com',
      subject: mailSub,
      html: mytemp
    };
    return send(mailOptions);
  },

  /**
   * Contact Us Page Template.
   * @param query
   * @returns {Promise<*>}
   */
  contactUs: async (query) =>  {
    const email = query.email;
    const name = query.name;
    const message = query.message;
    const mailSub = "Contact Us";
    const content =`
      <br/>
      <span>This is a confirmation email to let you know that ${name} wants to connect.</span>
      <br/>
      <span>Email Address: ${email}</span>
      <br/>
      <span>Name: ${name}</span>
      <br/>
      <span>Message: ${message}</span>
      <br/>
      <span>Please click the below to login:</span>
      <br/>
      <a href="https://useinfluence.co/login">
        <button type="button" style="color: white; margin: 20px 2px;  background-color:#097fff; border-radius: 4px; width: 100%; height: 46px; font-size: 14px; font-weight: bold;">
          Demo
        </button>
      </a>
      <br/>
      <span>Thanks for investing your faith in us.</span>
      <br/>
      <span>See you soon.</span>
      <br/>
      <span>Thanks!</span>
    `;

    var mytemp = template.commontemp(mailSub, name, content);

    let mailOptions = {
      from: 'support@useinfluence.co',
      to: 'useinfluencecosupport@useinfluence.freshdesk.com',
      subject: mailSub,
      html: mytemp
    };
    return send(mailOptions);
  },

};
