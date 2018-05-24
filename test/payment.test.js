/**
 * Test Payment Services !
 * @type {"assert".internal | ((value: any, message?: string) => void)}
 */

let chai = require('chai');
let expect = chai.expect;
const request = require('co-supertest');
const payment = require('../api/payment/services/Payment');
const uuid = require('uuid/v4');
const email = `${uuid()}@test.com`;
const password = uuid();
const stripe = require("stripe")(
  "sk_test_hIHBmEAcq9nzEIGICQ6gjFmY"
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
        else
          Token = res.body.token;
       });
     });
  });


/*
 * Test the login user
 */
  describe('user login test', () => {
    it('it should Login User', function *() {
      yield request(strapi.config.url)
        .post('/auth/local')
        .send({
         identifier: email,
         password: password
        })
       .expect(200)
       .expect('Content-Type', /json/)
       .then((res) => {
         if(!res)
          throw { message: "test failed", error: true };
         Token = res.body.jwt;
      });
    })
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
         "id":stripe_token
       }
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
    .expect(201)
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
