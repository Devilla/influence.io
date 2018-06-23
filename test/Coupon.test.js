/**
 * Test Campaign Services !
 * @type {"assert".internal | ((value: any, message?: string) => void)}
 */

let chai = require('chai');
let expect = chai.expect;
const request = require('co-supertest');
const coupon = require('../api/coupon/services/Coupon');
const uuid = require('uuid/v4');
const email = `${uuid()}@test.com`;
const password = uuid();
var Token, user;

/**
 * Test the signup user
 **/
describe('user sign up test to enter coupon', () => {
    it('should have signned user', function *() {
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
          throw res.error
        Token = res.body.jwt;
        user = res.body.user;
      });
    });
  });

/*
 * Test the login user
 */
describe('user login test to enter coupon', () => {
    it('should have Logged User', function *() {
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
         user = res.body.user;
      });
    })
  });

  /*
   * Test the coupon 
   */
 describe("user should get coupon test",function(){
    it('should have find the  coupon', function *() {
        yield request(strapi.config.url)
          .get('/coupon')
          .set('Authorization', `Bearer ${Token}`)
          .expect(200)
          .then((res) => {
            if(!res)
                throw err;
            else
               expect(res.body[0].code).to.be.a('string');
          });
        });
     });