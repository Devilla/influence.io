'use strict';

/**
 * Payment.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const env = require('dotenv').config()

let stripe = require('stripe')(process.env.STRIPE_KEY || 'sk_test_hIHBmEAcq9nzEIGICQ6gjFmY');

let createCustomer = (info) => {
  return stripe.customers.create({
    email: info.user.email,
    source: info.source,
  }).then(function(customer) {
    let params = { _id: info.user._id };
    let updatedValue = { stripe: customer.id };
    strapi.plugins['users-permissions'].services.user.edit(params, updatedValue);
    return customer;
  })
  .catch(error => {
    return error;
  });
}

let chargeCustomer = (info) => {
  return stripe.charges.create({
   amount: info.amount,
   currency: info.currency,
   customer: info.customer.id,
  })
  .then(charge => {
     if(charge.status !== 'succeeded')
       return { message: "payment not successfull", error: true};
     const chargeValues = {
       user: info.user,
       plan: info.plan,
       charge_id: charge.id,
       amount: charge.amount/100 ,
       amount_refunded: charge.amount_refunded ,
       balance_transaction: charge.balance_transaction ,
       captured: charge.captured ,
       created: charge.created ,
       currency: charge.currency ,
       customer: charge.customer ,
       description: charge.description ,
       on_behalf_of: charge.on_behalf_of ,
       outcome: charge.outcome ,
       paid: charge.paid ,
       receipt_email: charge.receipt_email ,
       refunds: charge.refunds,
       source: charge.source,
       status: charge.status
    };
     return chargeValues;
   })
  .catch(err => {
    return err
  });
}

let createPayment = (charge) => {
  return Payment.create(charge);
}

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
    let amount = values.amount*100;
    let customerId, accountObject, accountId, accountType, chargeValues;

    const customer = await createCustomer({
      user: user,
      source: token,
    });

    const charge = await chargeCustomer({
      customer,
      amount,
      user: values.user,
      plan: values.plan,
      currency: values.currency?values.currency:'usd'
    });

    if(charge.message)
      return charge;

    const data = await createPayment(charge);
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
