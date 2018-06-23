'use strict';

/**
 * Lifecycle callbacks for the `User` model.
 */
 const crypto = require('crypto');
 const request = require('request');

 /**
 * Function for http requests
 *
 *@param{{method, url, headers, form}}
 *@return {Promise}
 */
 function doRequest(options) {
   return new Promise(function (resolve, reject) {
     request(options , function (error, res, body) {
       const response = JSON.parse(body);
       if (!error && res.statusCode == 200 || !response.error) {
         resolve(body);
       } else {
         reject(response.error);
       }
     });
   });
 }


module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  // beforeSave: async (model) => {
  // },

  // After saving a value.
  // Fired after an `insert` or `update` query.
  // afterSave: async (model, result) => {},

  // Before fetching all values.
  // Fired before a `fetchAll` operation.
  // beforeFetchAll: async (model) => {},

  // After fetching all values.
  // Fired after a `fetchAll` operation.
  // afterFetchAll: async (model, results) => {},

  // Fired before a `fetch` operation.
  // beforeFetch: async (model) => {},

  // After fetching a value.
  // Fired after a `fetch` operation.
  // afterFetch: async (model, result) => {},

  // Before creating a value.
  // Fired before `insert` query.
  beforeCreate: async (model) => {
    //create verification token for new customer
    const verificationToken = crypto.randomBytes(64).toString('hex');
    model.verificationToken = verificationToken
    model.verified = false;

    const user = {
      id: model._id,
      name: model.username,
      email: model.email,
      password: model.password,
      provider: model.provider,
      customer_id: model._id,
    };

    try {

      //create new user in servicebot
      var data = await doRequest({method
        : 'POST', url:'https://servicebot.useinfluence.co/api/v1/users/register', form: user});
      //retrieve auth token for new user
      var token = await doRequest({method: 'POST',
      url:'https://servicebot.useinfluence.co/api/v1/auth/token', form: { email: model.email, password: model.password }});
      //retrieve new user's details from servicebot
      var userDetails = await doRequest({method: 'GET', url:'https://servicebot.useinfluence.co/api/v1/users/own', headers: {
        Authorization: 'JWT ' + JSON.parse(token).token,
        'Content-Type': 'application/json'
      }});

      //parse and save servicebot's new user's details to db
      userDetails = userDetails?JSON.parse(userDetails):[];
      if(userDetails.length)
        model.servicebot = {
          client_id: userDetails[0].id,
          status: userDetails[0].status,
        }
    } catch(error) {
      const err = {
        message: "Email already taken"
      };
      return err;
    }
  },

  // After creating a value.
  // Fired after `insert` query.
  afterCreate: async (model, result) => {
    /**
    * send email verification mail to new user
    *
    *@param{{email, subject, name, verificationToken}}
    *@return {Promise}
    */
    const email = result.email;
    const name = result.username.charAt(0).toUpperCase() + result.username.substr(1);
    const verificationToken = result.verificationToken;
    strapi.plugins.email.services.email.accountCreated(email, name, verificationToken);

    const state = {
      past_state: {
        state: null,
        created_at: null,
        updated_at: null
      },
      present_state: {
        state: "User Created",
        created_at: new Date(),
        updated_at: new Date()
      },
      future_state: {
        state: "Create Profile",
        created_at: new Date(),
        updated_at: new Date()
      },
      user: result._id
    };
    //Create new state for new user
    strapi.api.state.services.state.add(state);
  },

  // Before updating a value.
  // Fired before an `update` query.
  // beforeUpdate: async (model) => {},

  // After updating a value.
  // Fired after an `update` query.
  // afterUpdate: async (model, result) => {},

  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model) => {},

  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, result) => {}
};
