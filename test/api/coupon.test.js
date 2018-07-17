/**
 * Test Campaign Services !
 * @type {"assert".internal | ((value: any, message?: string) => void)}
 */

let chai = require('chai');
let expect = chai.expect;
const request = require('co-supertest');
const uuid = require('uuid/v4');
const email = `${uuid()}@test.com`;
const password = uuid();
var Token, user, coupon;

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


/**
  * Add the coupon
  **/
   describe('add coupon test',function(){
    it('should have created the  coupon', function *() {
      yield request(strapi.config.url)
      .post('/coupon')
      .set('Authorization', `Bearer ${Token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        type: 'demo',
        discount: 10,
        active: true,
        code: 'TESTING'
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((res,err) => {
        if(res.err)
            throw res.err;
        coupon = res.body;
      });
    });
  });


/**
  * Update  the coupon
  **/
  describe('Update  coupon test',function(){
    it('should have updated the  coupon', function *() {
      yield request(strapi.config.url)
      .put(`/coupon/${coupon._id}`)
      .set('Authorization', `Bearer ${Token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        type: 'fakeworld',
        discount: 10,
        active: true,
        code: 'Helloworld10'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res,err) => {
        if(res.err)
            throw res.err;

      });
    });
  });

/**
  * Fetch the coupon
  **/
  describe('user should get coupon test',function(){
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

/**
  * delete  the coupon
  **/

  describe('Delete coupon test',function(){
    it('should have deleted  the  coupon', function *() {
      yield request(strapi.config.url)
      .delete(`/coupon/${coupon._id}`)
      .set('Authorization', `Bearer ${Token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res,err) => {
        if(res.err)
          throw res.err;
      });
    });
  });

/**
* Delete the user
**/
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
