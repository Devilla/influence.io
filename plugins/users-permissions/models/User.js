'use strict';

/**
 * Lifecycle callbacks for the `User` model.
 */

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
  // beforeCreate: async (model) => {
  //     const role =  await strapi.query('role', 'users-permissions').findOne({ name: {$in:['customer', 'Customer']} }, ['users', 'permissions']);
  //     model.role = role;
  // },

  // After creating a value.
  // Fired after `insert` query.
  afterCreate: async (model, result) => {
    strapi.plugins.email.services.email.send({
      from: 'no-reply@strapi.io', // Sender (defaults to `strapi.config.smtp.from`).
      to: result.email, // Recipients list.
      html: '<p>Hello John</p>', // HTML version of the email content.
      text: 'Hello John' // Text version of the email content.
    }, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
      return;
    });
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
