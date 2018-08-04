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
var Token, user, rules;

/**
 * Test the user sign up
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
 * Test Create Rules
 **/
  describe('rules creation test', () => {
    it('it should create rules ', function *() {
      yield request(strapi.config.url)
      .post('/rules')
      .set('Authorization', `Bearer ${Token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        days: 5,
        delay: 4,
        mostRecent: true,
        isActive: true,
        hideNotification: false,
        loopNotification: true,
        delayNotification: true,
        closeNotification: false,
        initialDelay: 1,
        displayTime: 3,
        delayBetween: 4,
        displayPosition: 'Bottom Left',
        popupAnimationIn: 'fadeInUp',
        popupAnimationOut: 'fadeInDown'
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((data, err) => {
        if(data.error)
          throw data.error;
        rules = data.body;
      });
    });
  });

/**
 * Test Get User Campaigns
 **/
  describe('find all user`s rules test', () => {
    it('it should get all user`s rules', function *() {
      yield request(strapi.config.url)
      .get(`/rules/user`)
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
 * Test Get One Rule
 **/
  describe('find one rule test', () => {
    it('it should get one rule', function *() {
      yield request(strapi.config.url)
      .get(`/rules/${rules._id}`)
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
 * Test Edit Rule
 **/
  describe('rules update test', () => {
    it('it should update rules', function *() {
      yield request(strapi.config.url)
      .put(`/rules/${rules._id}`)
      .set('Authorization', `Bearer ${Token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        initialDelay: 2,
        displayTime: 4,
        delayBetween: 5
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
  * Test Delete Rule
  **/
  describe('rules deletion test', () => {
    it('it should delete rules', function *() {
      yield request(strapi.config.url)
        .delete(`/rules/${rules._id}`)
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
  * Delete the User
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
