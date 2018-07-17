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
var Token, profile, user, token;

/**
 * Test the login user
 **/
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
          throw res.error
        Token = res.body.jwt;
        user = res.body.user;
      });
    });
  });

/**
 * Test Get User Profile
 **/
  describe('find user`s profile test', () => {
    it('it should get user`s profile', function *() {
      yield request(strapi.config.url)
      .get(`/profile`)
      .set('Authorization', `Bearer ${Token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((data, err) => {
        if(data.error)
          throw data.error;
        profile = data.body;
      });
    });
  });

/**
 * Test Create token for oauth
 **/
  describe('token creation test', () => {
    it('it should create token for oauth', function *() {
      yield request(strapi.config.url)
      .post('/token')
      .set('Authorization', `Bearer ${Token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        value: 'servicebot.useinfluence.co',
        clientId: '2hg2h3fgf2g3fh1j543k',
        userId: user._id
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((data, err) => {
        if(data.error)
          throw data.error;
        token = data.body;
      });
    });
  });

/**
 * Test Get User's Token
 **/
  describe('find user`s token test', () => {
    it('it should get user`s token', function *() {
      yield request(strapi.config.url)
      .get(`/token`)
      .set('Authorization', `Bearer ${Token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((data, err) => {
        if(data.error)
          throw data.error;
      });
    });
  });

/**
 * Test Get One Token
 **/
  describe('find one token test', () => {
    it('it should get one token', function *() {
      yield request(strapi.config.url)
      .get(`/token/${token._id}`)
      .set('Authorization', `Bearer ${Token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((data, err) => {
        if(data.error)
          throw data.error;
      });
    });
  });

/**
 * Test Edit User's Token
 **/
  describe('token update test', () => {
    it('it should update token', function *() {
      yield request(strapi.config.url)
      .put(`/token/${token._id}`)
      .set('Authorization', `Bearer ${Token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        value: 'DEF'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((data, err) => {
        if(data.error)
          throw data.error;
      });
    });
  });

/**
  * Test Delete Token
  **/
  describe('token deletion test', () => {
    it('it should delete token', function *() {
      yield request(strapi.config.url)
        .delete(`/token/${token._id}`)
        .set('Authorization', `Bearer ${Token}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((data, err) => {
          if(data.error)
            throw data.error;
        });
    });
  });

/**
  * Test Delete Token
  **/
  describe('profile deletion test', () => {
    it('it should delete profile', function *() {
      yield request(strapi.config.url)
        .delete(`/profile/${profile._id}`)
        .set('Authorization', `Bearer ${Token}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((data, err) => {
          if(data.error)
            throw data.error;
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
