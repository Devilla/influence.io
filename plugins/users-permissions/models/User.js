'use strict';

/**
 * Lifecycle callbacks for the `User` model.
 */
 const crypto = require('crypto');

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
  },

  // After creating a value.
  // Fired after `insert` query.
  afterCreate: async (model, result) => {
    const email = result.email;
    const subject = "Account Created";
    const name = result.username.charAt(0).toUpperCase() + result.username.substr(1);
    const verificationToken = result.verificationToken;
    // Generate random token.

    strapi.plugins.email.services.email.accountCreated(email, subject, name, verificationToken);
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
