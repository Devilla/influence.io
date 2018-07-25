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
var Token, user, notificationPath;


/**
 * Test the signup user
 **/
  describe('user sign up test to get notificationPath', () => {
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
  * Add the Notification Path
  **/
  describe('add notification path',function(){
    it('should have created the  path', function *() {
      yield request(strapi.config.url)
      .post('/notificationpath')
      .set('Authorization', `Bearer ${Token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        url: '/customerdemo',
        class: 'success',
        status: 'undefined',
        type: 'display'
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((res,err) => {
        if(res.err)
            throw res.err;
        notificationPath = res.body;
      });
    });
  });

/**
  * Fetch the Notification Path
  **/
  describe('user should get Notification path',function(){
    it('should have get the  Path', function *() {
      yield request(strapi.config.url)
      .get('/notificationpath')
      .set('Authorization', `Bearer ${Token}`)
      .expect(200)
      .then((res) => {
        if(!res)
          throw err;
        else
          expect(res.body[0].url).to.match(/^\//);

      });
    });
  });



/**
  * Update the Notification Path
  **/
  describe('Update  notification Path',function(){
    it('should have updated the Path', function *() {
      yield request(strapi.config.url)
      .put(`/notificationpath/${notificationPath._id}`)
      .set('Authorization', `Bearer ${Token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        url: '/fakenotifydemo',
        class: 'success',
        status: 'undefined',
        type: 'lead'
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
  * delete  the notification path
  **/
  describe('Delete Notification Path',function(){
    it('should have deleted  the Path', function *() {
      yield request(strapi.config.url)
      .delete(`/notificationpath/${notificationPath._id}`)
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
