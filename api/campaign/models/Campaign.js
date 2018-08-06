'use strict';

/**
 * Lifecycle callbacks for the `Campaign` model.
 */

var uniqid = require('uniqid');

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  // beforeSave: async (model) => {},

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
    model.trackingId = uniqid('INF-');
  },

  // After creating a value.
  // Fired after `insert` query.
  afterCreate: async (model, result, options) => {
    // Get saved_state using related profile and parse to manipulate value
    const saved_state = JSON.parse(
      JSON.stringify(
        await strapi.api.state.services.state.fetch({
          profile: result.profile
        })
      )
    );

    const present_state = saved_state.present_state;
    const future_state = saved_state.future_state;

    //Add new values to saved_state
    saved_state.past_state = {
      state: present_state.state,
      created_at: present_state.created_at,
      updated_at: present_state.updated_at
    };

    saved_state.present_state['state'] = "Campaign Created";
    saved_state.present_state['updated_at'] = new Date();

    saved_state.future_state['state'] = "Configure Notification and Update";
    saved_state.future_state['updated_at'] = new Date();
    saved_state.campaign = result._id;

    // Update state with new values
    await strapi.api.state.services.state.edit({_id: saved_state._id}, saved_state);
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
