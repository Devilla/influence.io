// /**
//  * Test Campaign Services !
//  * @type {"assert".internal | ((value: any, message?: string) => void)}
//  */
//
// let chai = require('chai');
// let expect = chai.expect;
// const request = require('co-supertest');
// const uuid = require('uuid/v4');
// const email = `${uuid()}@test.com`;
// const password = uuid();
// var Token, profile, user, campaign;
//
// /**
//  * Test the login user
//  **/
//   describe('user sign up test', () => {
//     it('it should sign user', function *() {
//       yield request(strapi.config.url)
//       .post('/auth/local/register')
//       .send({
//         email: email,
//         password: password,
//         username: email.match(/^(.+)@/)[1]
//       })
//       .expect(200)
//       .then((res) => {
//         if(!res)
//           throw res.error
//         Token = res.body.jwt;
//         user = res.body.user;
//       });
//     });
//   });
//
// /**
//  * Test Get User Profile
//  **/
//   describe('find user`s profile test', () => {
//     it('it should get user`s profile', function *() {
//       yield request(strapi.config.url)
//       .get(`/profile`)
//       .set('Authorization', `Bearer ${Token}`)
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .then((data, err) => {
//         if(data.error)
//           throw data.error;
//         profile = data.body;
//       });
//     });
//   });
//
// /**
//  * Test Create Campaign
//  **/
//   describe('campaign creation test', () => {
//     it('it should create campaign with configuration and rules', function *() {
//       yield request(strapi.config.url)
//       .post('/campaign')
//       .set('Authorization', `Bearer ${Token}`)
//       .set('Content-Type', 'application/json')
//       .set('Accept', 'application/json')
//       .send({
//         websiteUrl: 'servicebot.useinfluence.co',
//         campaignName: 'Acme1',
//         profile: profile._id
//       })
//       .expect(201)
//       .expect('Content-Type', /json/)
//       .then((data, err) => {
//         if(data.error)
//           throw data.error;
//         campaign = data.body;
//       });
//     });
//   });
//
// /**
//  * Test Get User Campaigns
//  **/
//   describe('campaign find all campaigns test', () => {
//     it('it should get all users campaign', function *() {
//       yield request(strapi.config.url)
//       .get(`/campaign`)
//       .set('Authorization', `Bearer ${Token}`)
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .then((data, err) => {
//         if(data.error)
//           throw data.error;
//       });
//     });
//   });
//
// /**
//  * Test Get One Campaigns
//  **/
//   describe('campaign find one campaign test', () => {
//     it('it should get one campaign', function *() {
//       yield request(strapi.config.url)
//       .get(`/campaign/${campaign._id}`)
//       .set('Authorization', `Bearer ${Token}`)
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .then((data, err) => {
//         if(data.error)
//           throw data.error;
//       });
//     });
//   });
//
// /**
//  * Test Edit Campaign
//  **/
//   describe('campaign update test', () => {
//     it('it should update campaign', function *() {
//       yield request(strapi.config.url)
//       .put(`/campaign/${campaign._id}`)
//       .set('Authorization', `Bearer ${Token}`)
//       .set('Content-Type', 'application/json')
//       .set('Accept', 'application/json')
//       .send({
//         isActive: false
//       })
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .then((data, err) => {
//         if(data.error)
//           throw data.error;
//       });
//     });
//   });
//
// /**
//   * Test Delete Campaign
//   **/
//   describe('campaign deletion test', () => {
//     it('it should delete campaign with configuration and rules', function *() {
//       yield request(strapi.config.url)
//         .delete(`/campaign/${campaign._id}`)
//         .set('Authorization', `Bearer ${Token}`)
//         .set('Content-Type', 'application/json')
//         .set('Accept', 'application/json')
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .then((data, err) => {
//           if(data.error)
//             throw data.error;
//         });
//     });
//   });
//
// /**
//   * Delete the user
//   **/
//   describe('Should Delete User', function() {
//     it("should delete user", function *() {
//       yield request(strapi.config.url)
//       .delete(`/user/${user._id}`)
//       .set('Authorization', `Bearer ${Token}`)
//       .set('Accept', 'application/json')
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .then((data, err) => {
//         if(data.error)
//           throw data.error;
//       });
//     });
//   });
