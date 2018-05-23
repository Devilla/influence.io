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
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

let stripe = require('stripe')(process.env.STRIPE_KEY || 'sk_test_hIHBmEAcq9nzEIGICQ6gjFmY');


module.exports = {

  /**
   * Promise to fetch all payments.
   *
   * @return {Promise}
   */

  fetchAllUserPayments: (params) => {
    const query = {
      profile: params?params._id:null
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


  userInvoices: async (user) => {
    var auth_token = await doRequest({method: 'POST', url:'http://206.81.0.120/api/v1/auth/token', form: { email: user.email, password: user.password }});

    var invoices = await doRequest({
      method: 'GET',
      url:'http://206.81.0.120/api/v1/invoices/own',
      headers: {
        Authorization: 'JWT ' + JSON.parse(auth_token).token,
        'Content-Type': 'application/json'
      }
    });
    return invoices;
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
    let token = values.paymentProvider.id;

    var auth_token = await doRequest({method: 'POST', url:'http://206.81.0.120/api/v1/auth/token', form: { email: user.email, password: user.password }});

    if(auth_token) {
      const subscription = {
        "id":14,
        "category_id":1,
        "created_by":1,
        "name":"Paid",
        "description":"monthly",
        "details":null,
        "published":true,
        "statement_descriptor":
        "Useinfluence",
        "trial_period_days":0,
        "amount":1000,
        "overhead":null,
        "currency":"usd",
        "interval":"day",
        "interval_count":1,
        "type":"subscription",
        "subscription_prorate":true,
        "split_configuration":null,
        "created_at":"2018-05-23T10:04:22.813Z",
        "updated_at":"2018-05-23T10:04:22.813Z",
        "references":{"service_template_properties":[]},
        "token_id": token,
        "client_id": user.servicebot.client_id
      };

      var payment_subscription = await doRequest({
        method: 'POST',
        url:'http://206.81.0.120/api/v1/service-templates/14/request',
        json: subscription,
        headers: {
          Authorization: 'JWT ' + JSON.parse(auth_token).token,
          'Content-Type': 'application/json'
        }
      });
    } else {
      return { message: "user not found", err: true };
    }

    const payment_values = {
      user: user._id,
      service_id: payment_subscription.service_id,
      service_id: payment_subscription.service_id,
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

    const data = await Payment.create(payment_values);;
    return data;
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
