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
var Token, user, configuration;


/**
 * Test the signup user
 **/
  describe('user sign up test to have configurations', () => {
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
  * Add the Configuration record
  **/
 describe('add Configuration record',function(){
    it('should have created the  record', function *() {
      yield request(strapi.config.url)
      .post('/configuration')
      .set('Authorization', `Bearer ${Token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        activity: true,
        panelStyle: {"h1":"title"},
        contentText: 'hello',
        visitorText: 'display',
        notificationUrl: '/demopage',
        toggleMap: false
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((res,err) => {
        if(res.err)
            throw res.err;
        configuration = res.body;
      });
    });
  });


/**
  * Fetch the Configuration record
  **/
  describe('fetch configuration record',function(){
    it('should fetch record', function *() {
      yield request(strapi.config.url)
      .get('/configuration')
      .set('Authorization', `Bearer ${Token}`)
      .expect(200)
      .then((res) => {
        if(!res)
            throw err;
      });
    });
  });


/**
  * Update the configuration record
  **/
  describe('Update Configuration record',function(){
    it('should update the record', function *() {
      yield request(strapi.config.url)
      .put(`/configuration/${configuration._id}`)
      .set('Authorization', `Bearer ${Token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        activity: false,
        panelStyle: {"h3":"demo"},
        contentText: 'hello',
        visitorText: 'display',
        notificationUrl: '/anotherdemopage',
        toggleMap: true
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
 * delete  the  configuration record
 **/
  describe('Delete Configuration record',function(){
    it('should have deleted configuration record', function *() {
      yield request(strapi.config.url)
      .delete(`/configuration/${configuration._id}`)
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
