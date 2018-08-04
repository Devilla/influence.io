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
        <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
          <tr>
            <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;"
                height="100%"
                valign="top"
                bgcolor="">
                <div>Hey ${name},</div>
                <div>&nbsp;</div>
                <div>This is a confirmation email to let you know that your account has been created.</div>
            </td>
          </tr>
        </table>
        <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%">
          <tbody>
            <tr>
              <td align="center" class="outer-td" style="padding:0px 0px 0px 0px">
                <table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:left">
                  <tbody>
                    <tr>
                      <td align="center" bgcolor="#097fff" class="inner-td" style="border-radius:6px;font-size:16px;text-align:center;background-color:inherit"><a style="background-color:#097fff;border:1px solid #333333;border-color:#097fff;border-radius:5px;border-width:1px;color:#ffffff;display:inline-block;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:normal;letter-spacing:0px;line-height:16px;padding:12px 18px 12px 18px;text-align:center;text-decoration:none" href="https://useinfluence.co/verify/${verificationToken}" target="_blank">Verify</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
          <tr>
            <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;"
                height="100%"
                valign="top"
                bgcolor="">
              <div>Thanks for investing your faith in us.</div>
            </td>
          </tr>
        </table>
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
        <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
          <tr>
            <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;"
                height="100%"
                valign="top"
                bgcolor="">
                <div>Hey ${name},</div>
                <div>&nbsp;</div>
                <div>You told us you forgot your password. If you really did, click here to choose a new one</div>
            </td>
          </tr>
        </table>
        <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%">
          <tbody>
            <tr>
              <td align="center" class="outer-td" style="padding:0px 0px 0px 0px">
                <table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:left">
                  <tbody>
                    <tr>
                      <td align="center" bgcolor="#097fff" class="inner-td" style="border-radius:6px;font-size:16px;text-align:center;background-color:inherit"><a style="background-color:#097fff;border:1px solid #333333;border-color:#097fff;border-radius:5px;border-width:1px;color:#ffffff;display:inline-block;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:normal;letter-spacing:0px;line-height:16px;padding:12px 18px 12px 18px;text-align:center;text-decoration:none" href="https://useinfluence.co/reset-password?code=${resetPasswordToken}" target="_blank">Choose a New Password</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
          <tr>
            <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;"
                height="100%"
                valign="top"
                bgcolor="">
              <div>If you didn&#39;t mean to reset your password, then you can just ignore this email, and your password will remain same.</div>
              <div>&nbsp;</div>
              <div>Thanks!</div>

            </td>
          </tr>
        </table>
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
        <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
          <tr>
            <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;"
                height="100%"
                valign="top"
                bgcolor="">
                <div>Hey ${name},</div>
                <div>&nbsp;</div>
                <div>This is a confirmation email to let you know that your account has exceeded the limit.</div>
            </td>
          </tr>
        </table>
        <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%">
          <tbody>
            <tr>
              <td align="center" class="outer-td" style="padding:0px 0px 0px 0px">
                <table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:left">
                  <tbody>
                    <tr>
                      <td align="center" bgcolor="#097fff" class="inner-td" style="border-radius:6px;font-size:16px;text-align:center;background-color:inherit"><a style="background-color:#097fff;border:1px solid #333333;border-color:#097fff;border-radius:5px;border-width:1px;color:#ffffff;display:inline-block;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:normal;letter-spacing:0px;line-height:16px;padding:12px 18px 12px 18px;text-align:center;text-decoration:none" href="https://useinfluence.co/login" target="_blank">Upgrade</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
          <tr>
            <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;"
                height="100%"
                valign="top"
                bgcolor="">
              <div>Thanks for investing your faith in us.</div>
              <div>See you soon.</div>
            </td>
          </tr>
        </table>
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
    const company = query.company;
    const totalEmployee = query.totalEmployee;
    const department = query.department;
    const mailSub = "Demo requested";
    const content =`
      <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;" height="100%" valign="top" bgcolor="">
            <div>Hey ${firstname},</div>
            <div>&nbsp;</div>
            <div>First Name: ${firstname}</div>
            <div>&nbsp;</div>
            <div>Last Name: ${lastname}</div>
            <div>&nbsp;</div>
            <div>Email: ${email}</div>
            <div>&nbsp;</div>
            <div>Phone Number: ${phonenumber}</div>
            <div>&nbsp;</div>
            <div>Company: ${company}</div>
            <div>&nbsp;</div>
            <div>Total Employees: ${totalEmployee}</div>
            <div>&nbsp;</div>
            <div>Department: ${department}</div>
            <div>&nbsp;</div>
          </td>
        </tr>
      </table>
      <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%">
        <tbody>
          <tr>
            <td align="center" class="outer-td" style="padding:0px 0px 0px 0px">
              <table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:left">
                <tbody>
                  <tr>
                    <td align="center" bgcolor="#097fff" class="inner-td" style="border-radius:6px;font-size:16px;text-align:center;background-color:inherit"><a style="background-color:#097fff;border:1px solid #333333;border-color:#097fff;border-radius:5px;border-width:1px;color:#ffffff;display:inline-block;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:normal;letter-spacing:0px;line-height:16px;padding:12px 18px 12px 18px;text-align:center;text-decoration:none" href="https://useinfluence.co/" target="_blank">Demo</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;"
              height="100%"
              valign="top"
              bgcolor="">
            <div>Thanks for investing your faith in us.</div>
            <div>See you soon.</div>
          </td>
        </tr>
      </table>
    `;

    var mytemp = template.commontemp(mailSub, firstname, content);

    let mailOptions = {
      from: 'info@useinfluence.co',
      to: 'support@useinfluence.co',
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
      <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;" height="100%" valign="top" bgcolor="">
            <div>${name} register for Affiliate,</div>
            <div>&nbsp;</div>
            <div>Name: ${name}</div>
            <div>&nbsp;</div>
            <div>Email: ${email}</div>
            <div>&nbsp;</div>
          </td>
        </tr>
      </table>
      <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;"
              height="100%"
              valign="top"
              bgcolor="">
            <div>Thanks for investing your faith in us.</div>
            <div>See you soon.</div>
          </td>
        </tr>
      </table>
    `;

    var mytemp = template.commontemp(mailSub, name, content);

    let mailOptions = {
      from: 'info@useinfluence.co',
      to: 'support@useinfluence.co',
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
      <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;" height="100%" valign="top" bgcolor="">
            <div>${name} wants to connect.</div>
            <div>&nbsp;</div>
            <div>Name: ${name}</div>
            <div>&nbsp;</div>
            <div>Email: ${email}</div>
            <div>&nbsp;</div>
            <div>Message: ${message}</div>
            <div>&nbsp;</div>
          </td>
        </tr>
      </table>
      <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;"
              height="100%"
              valign="top"
              bgcolor="">
            <div>Thanks for investing your faith in us.</div>
            <div>See you soon.</div>
          </td>
        </tr>
      </table>
    `;

    var mytemp = template.commontemp(mailSub, name, content);

    let mailOptions = {
      from: 'info@useinfluence.co',
      to: 'support@useinfluence.co',
      subject: mailSub,
      html: mytemp
    };
    return send(mailOptions);
  },


  /**
   * gdprform Page Template.
   * @param query
   * @returns {Promise<*>}
   */
  gdprForm: async (query) =>  {
    const email = query.email;
    const code = query.code;
    const mailSub = "GDPR Form sunbmition";
    const content =`
      <br/>
      <span>This is a confirmation email to let you know that you have been successfully GRPR Compliance.</span>
      <br/>
      <span>Please Enter the code in GDPR Form : {code}</span>
      <br/>
      {code}
      <br/>
      <span>Thanks for investing your faith in us.</span>
      <br/>
      <span>See you soon.</span>
      <br/>
      <span>Thanks!</span>
    `;

    var mytemp = template.commontemp(mailSub, code, content);

    let mailOptions = {
      from: 'support@useinfluence.co',
      to: email,
      subject: mailSub,
      html: mytemp
    };
    return send(mailOptions);
  }
};
