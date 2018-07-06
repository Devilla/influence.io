'use strict';

/**
 * Lifecycle callbacks for the `User` model.
 */
 const crypto = require('crypto');
 const request = require('request');
 const uuidv4 = require('uuid/v4');

function doRequest(options) {
  return new Promise(function (resolve, reject) {
    request(options , function (error, res, body) {
      if(res && res.statusCode >= 400) {
        return resolve({error: true, message: body});
      }
      const response = typeof body === 'string'? JSON.parse(body) : body;
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
    const verificationToken = crypto.randomBytes(64).toString('hex');
    model.verificationToken = verificationToken
    model.verified = false;
    model.password = model.password?model.password:uuidv4();
    const user = {
      id: model._id,
      name: model.username,
      email: model.email,
      password: model.password,
      provider: model.provider,
      customer_id: model._id,
    };
    try {
      var data = await doRequest({method: 'POST', url:'https://servicebot.useinfluence.co/api/v1/users/register', form: user});
      var token = await doRequest({method: 'POST', url:'https://servicebot.useinfluence.co/api/v1/auth/token', form: { email: model.email, password: user.password }});
      var userDetails = await doRequest({method: 'GET', url:'https://servicebot.useinfluence.co/api/v1/users/own', headers: {
        Authorization: 'JWT ' + JSON.parse(token).token,
        'Content-Type': 'application/json'
      }});
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
    const email = result.email;
    const name = result.username.charAt(0).toUpperCase() + result.username.substr(1);
    const verificationToken = result.verificationToken;
    strapi.plugins.email.services.email.accountCreated(email, name, verificationToken);
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
