'use strict';

/**
 * Lifecycle callbacks for the `Configuration` model.
 */

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
  // beforeCreate: async (model) => {},

  // After creating a value.
  // Fired after `insert` query.
  // afterCreate: async (model, result) => {},

  // Before updating a value.
  // Fired before an `update` query.
  // beforeUpdate: async (model) => {},

  // After updating a value.
  // Fired after an `update` query.
  afterUpdate: async (model, result) => {
    //find configuration campaign
    const configurationId = await Configuration
    .findOne({
      _id: model._update.id
    }, {
      campaign: 1,
      _id: 0
    });

    //find saved_state related to campaign
    if(configurationId) {
      const saved_state = JSON.parse(
        JSON.stringify(
          await strapi.api.state.services.state.fetch(
            {campaign: configurationId.campaign}
          )
        )
      );

      if(saved_state) {
        const present_state = saved_state.present_state;
        const future_state = saved_state.future_state;

        saved_state.past_state = {
          state: present_state.state,
          created_at: present_state.created_at,
          updated_at: present_state.updated_at
        };

        saved_state.present_state['state'] = "Payment Made";
        saved_state.present_state['updated_at'] = new Date();

        saved_state.future_state['state'] = "Create Campaign";
        saved_state.future_state['updated_at'] = new Date();

        await strapi.api.state.services.state.edit({_id: saved_state._id}, saved_state); //update saved_state with new state
      }
    }
  },

  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model) => {},

  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, result) => {}
};
