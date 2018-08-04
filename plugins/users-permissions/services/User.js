'use strict';

/**
 * User.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const request = require('request');

function doRequest(options) {
  return new Promise(function (resolve, reject) {
    request(options , function (error, res, body) {
      if(res.statusCode >= 400) {
        return resolve({error: true, message: body});
      }
      const response = typeof body === 'string'? JSON.parse(body) : body;
      if (!error && res.statusCode == 200 || response.error) {
        resolve(body);
      } else {
        reject(response.error);
      }
    });
  });
}

module.exports = {
  /**
   * Promise to add a/an user.
   *
   * @return {Promise}
   */

  add: async (values) => {
    if (values.password) {
      values.password = await strapi.plugins['users-permissions'].services.user.hashPassword(values);
    }

    // Use Content Manager business logic to handle relation.
    if (strapi.plugins['content-manager']) {
      return await strapi.plugins['content-manager'].services['contentmanager'].add({
        model: 'user'
      }, values, 'users-permissions');
    }

    return strapi.query('user', 'users-permissions').create(values);
  },

  /**
   * Promise to edit a/an user.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    if (values.password) {
      values.password = await strapi.plugins['users-permissions'].services.user.hashPassword(values);
    }

    // Use Content Manager business logic to handle relation.
    if (strapi.plugins['content-manager']) {
      params.model = 'user';
      params.id = (params._id || params.id);

      return await strapi.plugins['content-manager'].services['contentmanager'].edit(params, values, 'users-permissions');
    }

    // return User.findOneOrUpdate({_id: params.id}, {$set: values}, { new : true, upsert: true, multi: true });
    return strapi.query('user', 'users-permissions').update(_.assign(params, values));
  },

  /**
   * Promise to fetch a/an user.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return strapi.query('user', 'users-permissions').findOne(_.pick(params, ['_id', 'id']));
  },

  /**
   * Promise to fetch all users.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    return strapi.query('user', 'users-permissions').find(strapi.utils.models.convertParams('user', params));
  },

  hashPassword: function (user = {}) {
    return new Promise((resolve) => {
      if (!user.password || this.isHashed(user.password)) {
        resolve(null);
      } else {
        bcrypt.hash(user.password, 10, (err, hash) => {
          resolve(hash)
        });
      }
    });
  },

  isHashed: (password) => {
    if (typeof password !== 'string' || !password) {
      return false;
    }

    return password.split('$').length === 4;
  },

  /**
   * Promise to remove a/an user.
   *
   * @return {Promise}
   */

  remove: async (params, user) => {
    // Use Content Manager business logic to handle relation.
    if (strapi.plugins['content-manager']) {
      params.model = 'user';
      params.id = (params._id || params.id);

      await strapi.plugins['content-manager'].services['contentmanager'].delete(params, {source: 'users-permissions'});
    }

    var token = await doRequest({method: 'POST', url:'https://servicebot.useinfluence.co/api/v1/auth/token', form: { email: user.email, password: user.password }});
    var response;
    if(token.error)
      return { err: true, message: token.message };
    if(token) {
      const payment_info = await Payment.findOne({user: user._id})
        .sort({created_at: -1})
        .exec((err, res) => {
          if(err)
            throw err;
          else
            return res;
        })

      if(payment_info)
        response = await doRequest({
          method: 'DELETE',
          url:`https://servicebot.useinfluence.co/service-instances/${payment_info.service_id}`,
          headers: {
            Authorization: 'JWT ' + JSON.parse(auth_token).token,
            'Content-Type': 'application/json'
          }
        });
      if(response && response.error)
        return { err: true, message: response.message };
      await doRequest({
        method: 'DELETE',
        url:`https://servicebot.useinfluence.co/api/v1/users/${user.servicebot.client_id}`,
        headers: {
          Authorization: 'JWT ' + JSON.parse(token).token,
          'Content-Type': 'application/json'
        }
      });
    }

    return strapi.query('user', 'users-permissions').delete(params);
  },

  validatePassword: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  }
};
