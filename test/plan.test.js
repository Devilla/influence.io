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
// var Token, profile, user, plan;
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
//         username: email.match(/^(.+)@/)[1],
//         role: "5abbc9295f2dad8367967215"
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
//  * Test Create Rules
//  **/
//   describe('plan creation test', () => {
//     it('it should create plan ', function *() {
//       yield request(strapi.config.url)
//       .post('/plan')
//       .set('Authorization', `Bearer ${Token}`)
//       .set('Content-Type', 'application/json')
//       .set('Accept', 'application/json')
//       .send({
//         subscribed_at: Date.now(),
//         servicebot_user_id: user.servicebot.client_id,
//         plan_details: {
//            amount:0,
//            category_id:1,
//            created_at:"2018-06-11T06:37:33.847Z",
//            created_by:1,
//            currency:"usd",
//            description:"50000",
//            details:"<p>1 month trial period</p>",
//            id:15,
//            interval:"month",
//            interval_count:1,
//            name:"Trial Version",
//            published:true,
//            references:{},
//            split_configuration:null,
//            statement_descriptor:"Useinfluence",
//            subscription_prorate:true,
//            trial_period_days:0,
//            type:"subscription",
//            updated_at: Date.now()
//         },
//         coupon_details: 'FIRSTCOME',
//       })
//       .expect(201)
//       .expect('Content-Type', /json/)
//       .then((data, err) => {
//         if(data.error)
//           throw data.error;
//         plan = data.body;
//       });
//     });
//   });
//
// /**
//  * Test Get User Campaigns
//  **/
//   describe('find all user`s plan test', () => {
//     it('it should get all user`s plan', function *() {
//       yield request(strapi.config.url)
//       .get(`/plan/user`)
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
//   describe('find one plan test', () => {
//     it('it should get one rule', function *() {
//       yield request(strapi.config.url)
//       .get(`/plan/${plan._id}`)
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
//   describe('plan update test', () => {
//     it('it should update plan', function *() {
//       yield request(strapi.config.url)
//       .put(`/plan/${plan._id}`)
//       .set('Authorization', `Bearer ${Token}`)
//       .set('Content-Type', 'application/json')
//       .set('Accept', 'application/json')
//       .send({
//         plan_details: {
//            amount:0,
//            category_id:1,
//            created_at:"2018-06-11T06:37:33.847Z",
//            created_by:1,
//            currency:"inr",
//            description:"5000",
//            details:"<p>1 month trial period</p>",
//            id:15,
//            interval:"month",
//            interval_count:1,
//            name:"Trial Version",
//            published:true,
//            references:{},
//            split_configuration:null,
//            statement_descriptor:"Useinfluence",
//            subscription_prorate:true,
//            trial_period_days:0,
//            type:"subscription",
//            updated_at: Date.now()
//         },
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
//   describe('plan deletion test', () => {
//     it('it should delete plan', function *() {
//       yield request(strapi.config.url)
//         .delete(`/plan/${plan._id}`)
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
