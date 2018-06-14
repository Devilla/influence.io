'use strict';

/**
 * Payment.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const env = require('dotenv').config()
const request = require('request');

function doRequest(options) {
  return new Promise(function (resolve, reject) {
    request(options , function (error, res, body) {
      const response = typeof body == 'string'?JSON.parse(body): body;
      if (!error && res.statusCode == 200 || !response.error) {
        resolve(body);
      } else {
        reject(response.error);
      }
    });
  });
}

let stripe = require('stripe')(process.env.STRIPE_KEY);

module.exports = {

  /**
   * Promise to fetch all payments.
   *
   * @return {Promise}
   */

  fetchAllUserPayments: (params) => {
    const query = {
      user: params?params._id:null
    };
    const convertedParams = strapi.utils.models.convertParams('payment', query);

    return Payment
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate('plan');
    // .populate(_.keys(_.groupBy(_.reject(strapi.models.payment.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch all plan payments.
   *
   * @return {Promise}
   */

  fetchAllPlanPayments: (params) => {
    const query = {
      plan: params.id
    };
    const convertedParams = strapi.utils.models.convertParams('payment', query);

    return Payment
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate('plan');
    // .populate(_.keys(_.groupBy(_.reject(strapi.models.payment.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch all payments invoices.
   *
   * @return {Promise}
   */

  userInvoices: async (user) => {
    var auth_token = await doRequest({method: 'POST', url:'https://servicebot.useinfluence.co/api/v1/auth/token', form: { email: user.email, password: user.password }});

    var invoices = await doRequest({
      method: 'GET',
      url:'https://servicebot.useinfluence.co/api/v1/invoices/own',
      headers: {
        Authorization: 'JWT ' + JSON.parse(auth_token).token,
        'Content-Type': 'application/json'
      }
    });
    return JSON.parse(invoices);
  },


  /**
   * Promise to fetch all payments.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    const convertedParams = strapi.utils.models.convertParams('payment', params);

    return Payment
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate('plan');
    // .populate(_.keys(_.groupBy(_.reject(strapi.models.payment.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch a/an payment.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return Payment
      .findOne(_.pick(params, _.keys(Payment.schema.paths)))
      .populate('plan');
    // .populate(_.keys(_.groupBy(_.reject(strapi.models.payment.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an payment.
   *
   * @return {Promise}
   */

  add: async (user, values) => {
    let token;
    let plan = values.plan;
    let payment_subscription;
    let auth_token = await doRequest({method: 'POST', url:'https://servicebot.useinfluence.co/api/v1/auth/token', form: { email: user.email, password: user.password }});

    plan["client_id"] = user.servicebot.client_id;

    if(Object.keys(values.coupon).length === 0) {
      token = values.paymentProvider.id;
      plan["token_id"] = token;
      // await strapi.services.payment.upgradeCard(user, { id: token}).then(res => {
      //   console.log(res, "=========");
      // })
    }

    if(auth_token) {
      payment_subscription = await doRequest({
        method: 'POST',
        url:`https://servicebot.useinfluence.co/api/v1/service-templates/${plan.id}/request`,
        json: plan,
        headers: {
          Authorization: 'JWT ' + JSON.parse(auth_token).token,
          'Content-Type': 'application/json'
        }
      });
    } else {
      return { message: "user not found", err: true };
    }
    if(payment_subscription.error) {
      return payment_subscription.error;
    }
    const payment_values = {
      user: user._id,
      service_id: payment_subscription.service_id,
      service_instance_id: payment_subscription.id,
      user_id: payment_subscription.user_id,
      requested_by: payment_subscription.requested_by,
      payment_plan: payment_subscription.payment_plan,
      name: payment_subscription.name,
      description: payment_subscription.description,
      subscription_id: payment_subscription.subscription_id,
      subscribed_at: payment_subscription.subscribed_at,
      trial_end: payment_subscription.trial_end,
      status: payment_subscription.status,
      type: payment_subscription.type,
      created_at: payment_subscription.created_at,
      updated_at: payment_subscription.updated_at,
    };
    const plan_value = {
      user: user._id,
      coupon_details: values.coupon,
      plan_details: payment_subscription.payment_plan,
      subscribed_at: payment_subscription.subscribed_at,
      servicebot_user_id: payment_subscription.user_id
    };
    await Plan.create(plan_value);
    const data = await Payment.create(payment_values);
    return data;
  },

  /**
   * Promise to upgrade a/an servicebot payment card.
   *
   * @return {Promise}
   */

  upgradeCard: async (user, values) => {
    var add_funds;
    let token = values.id;
    var auth_token = await doRequest({method: 'POST', url:'https://servicebot.useinfluence.co/api/v1/auth/token', form: { email: user.email, password: user.password }});

    const funds_details = {
      "user_id": user.servicebot.client_id,
      "token_id": token
    };

    if(auth_token) {
      add_funds = await doRequest({
        method: 'POST',
        url:'https://servicebot.useinfluence.co/api/v1/funds',
        form: funds_details,
        headers: {
          Authorization: 'JWT ' + JSON.parse(auth_token).token,
          'Content-Type': 'application/json'
        }
      });
    } else {
      return { message: "user not found", err: true };
    }
    return JSON.parse(add_funds);
  },

  /**
   * Promise to cancel a/an servicebot payment subscription.
   *
   * @return {Promise}
   */

  cancelSubscription: async (user) => {
    var auth_token = await doRequest({method: 'POST', url:'https://servicebot.useinfluence.co/api/v1/auth/token', form: { email: user.email, password: user.password }});
    var payment_info;
    if(auth_token)
      return await Payment.findOne({user: user._id})
      .sort({ field: 'asc', _id: -1 })
      .exec((err, res) => {
        if(err)
          throw err;
        else {
          return doRequest({
              method: 'POST',
              url:`https://servicebot.useinfluence.co/service-instances/${res.service_instance_id}/cancel`,
              headers: {
                Authorization: 'JWT ' + JSON.parse(auth_token).token,
                'Content-Type': 'application/json'
              }
            })
            .then(result => {
              return result;
            })
            .catch(error => {
              throw error;
            })
        }
      });
    else
      return { err: true, message: "No user found"};
  },

  /**
   * Promise to delete a/an servicebot payment subscription.
   *
   * @return {Promise}
   */

  deleteSubscription: async (user) => {
    var auth_token = await doRequest({method: 'POST', url:'https://servicebot.useinfluence.co/api/v1/auth/token', form: { email: user.email, password: user.password }});

    var payment_info;

    if(auth_token)
      return await Payment.findOne({user: user._id})
      .sort({ field: 'asc', _id: -1 })
      .exec((err, res) => {
        if(err)
          throw err;
        else {
          return doRequest({
            method: 'DELETE',
            url:`https://servicebot.useinfluence.co/service-instances/${res.service_instance_id}`,
            headers: {
              Authorization: 'JWT ' + JSON.parse(auth_token).token,
              'Content-Type': 'application/json'
            }
          })
          .then(result => {
            return result;
          })
          .catch(error => {
            throw error;
          })
        }
      });
    else
      return { err: true, message: "No user found"};
  },

  /**
   * Promise to edit a/an payment.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    await strapi.hook.mongoose.manageRelations('payment', _.merge(_.clone(params), { values }));
    return Payment.update(params, values, { multi: true });
  },

  /**
   * Promise to remove a/an payment.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Payment.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.payment.associations, {autoPopulate: false}), 'alias')).join(' '));

    _.forEach(Payment.associations, async association => {
      const search = (_.endsWith(association.nature, 'One')) ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
      const update = (_.endsWith(association.nature, 'One')) ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

      await strapi.models[association.model || association.collection].update(
        search,
        update,
        { multi: true });
    });

    return data;
  }
};
