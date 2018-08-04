/**
 * Test Payment Services !
 * @type {"assert".internal | ((value: any, message?: string) => void)}
 */

let chai = require('chai');
let expect = chai.expect;
const request = require('co-supertest');
const uuid = require('uuid/v4');
const email = `${uuid()}@test.com`;
const password = uuid();
const stripe = require("stripe")(
  "sk_test_xQUXiwmFS01hpVGh3dMsh0ru"
);
var Token, user, stripe_token;

function createNewToken(done) {
  stripe.tokens.create({
    card: {
      "number": '4242424242424242',
      "exp_month": 12,
      "exp_year": 2023,
      "cvc": '123'
    }
  }, function(err, token) {
    stripe_token = token.id;
    done();
  });
};

/*
 * Test the login user
 */
 describe('user sign up test', () => {
   it('it should sign user', function *() {
     yield request(strapi.config.url)
       .post('/auth/local/register')
       .send({
         email: email,
         password: password,
         username: email.match(/^(.+)@/)[1]
       })
       .expect(200)
       .then((res) => {
          if(!res)
            throw err
          Token = res.body.jwt;
          user = res.body.user;
       });
     });
  });

/*
 * Test the payment method
 */
describe('Should Create Payment', function() {
  it('should create and return payment info', function *() {
    yield createNewToken;
    yield request(strapi.config.url)
     .post('/payment')
     .set('Authorization', `Bearer ${Token}`)
     .set('Content-Type', 'application/json')
     .set('Accept', 'application/json')
     .send({
       "paymentProvider": {
         "id": stripe_token
       },
       "plan" : {
         amount: 0,
         category_id: 1,
         created_at: "2018-07-11T08:34:24.305Z",
         created_by: 1,
         currency: "usd",
         description: "50000",
         details: "<p><b>1 month trial period</b></p>",
         id: 1,
         interval: "month",
         interval_count: 1,
         name: "Beta Plan",
         overhead: null,
         published: true,
         references: {},
         split_configuration: null,
         statement_descriptor: "Useinfluence",
         subscription_prorate: true,
         trial_period_days: 0,
         type: "subscription",
         updated_at: "2018-07-14T13:38:32.658Z"
       },
       "coupon": 'FIRSTCOME'
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .then((data, err) => {
      if(data.error)
        throw data.error;
    });
  });
});

/*
 * Test the payment invoices
 */
describe('Should Get Payment Invoices', function() {
  it("should get user's payment invoices", function *() {
    yield request(strapi.config.url)
    .get('/payment/servicebot/invoice')
    .set('Authorization', `Bearer ${Token}`)
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data, err) => {
      if(data.error)
        throw data.error;
    });
  });
});

/*
 * Test the adding new card details to servicebot
 */
describe("Should Upgrade User's Card details", function() {
  it("should upgrade and get user's new card", function *() {
    yield createNewToken;
    yield request(strapi.config.url)
    .put('/payment/servicebot/card')
    .set('Authorization', `Bearer ${Token}`)
    .set('Accept', 'application/json')
    .send({
      "paymentProvider": {
        "id":stripe_token
      }
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data, err) => {
      if(data.error)
        throw data.error;
    });
  });
});

/*
 * Cancel the payment subscription
 */
describe('Should Cancel Payment Subscription', function() {
  it("should cancel user's payment subscription", function *() {
    yield request(strapi.config.url)
    .post('/payment/servicebot/cancel')
    .set('Authorization', `Bearer ${Token}`)
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data, err) => {
      if(data.error)
        throw data.error;
    });
  });
});

/*
 * Delete the payment subscription
 */
describe('Should Delete Payment Subscription', function() {
  it("should delete user's payment subscription", function *() {
    yield request(strapi.config.url)
    .delete('/payment/servicebot/delete')
    .set('Authorization', `Bearer ${Token}`)
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data, err) => {
      if(data.error)
        throw data.error;
    });
  });
});

/*
 * Delete the user
 */
describe('Should Delete User', function() {
  it("should delete user", function *() {
    yield request(strapi.config.url)
    .delete(`/user/${user._id}`)
    .set('Authorization', `Bearer ${Token}`)
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data, err) => {
      if(data.error)
        throw data.error;
    });
  });
});
