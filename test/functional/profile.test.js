// /**
//  * Test picasaWeb and Gravatar
//  * @type {"assert".internal | ((value: any, message?: string) => void)}
//  */
// let chai = require('chai');
// let expect = chai.expect;
// const rules = require('../../api/rules/services/Rules');
//
// const websiteUrl='';
// const isActive=false;
// describe('Should Return rules Data', function() {
//   describe('#rules-add()', function() {
//     it('should return data when the value is passed', function() {
//       let values = {
//         id:'5b3b49c8341d70505653d750',
//         name:'Raman Parashar',
//         email:"raman.parashar.dce@gmail.com"
//       };
//         rules.add(values).then(function (data) {
//          expect(data).to.not.equal(null);
//       });
//     });
//   });
// });
//
//
// describe('Should Return rules Data', function() {
//   describe('#fetchAll()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         id:'5b3b49c8341d70505653d750',
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       }
//         rules.fetchAll(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//
//       });
//     });
//   });
// });
//
// describe('Should Return rules Data', function() {
//   describe('#fetchAllUserRules()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         id:'5b3b49c8341d70505653d750',
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       }
//         rules.fetchAllUserRules(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//
//       });
//     });
//   });
// });
//
//
// describe('Should Return rules Data', function() {
//   describe('#fetchAllUserRules()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         id:'5b3b49c8341d70505653d750',
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       }
//         rules.fetchAllCampaignRules(params).then(function (data) {
//          expect(data).to.equal(null);
//
//       });
//     });
//   });
// });
//
//
// describe('Should Return rules Data', function() {
//   describe('#fetchAllNotificationTypesRules()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         id:'5b3b49c8341d70505653d750',
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       }
//         rules.fetchAllNotificationTypesRules(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//
//       });
//     });
//   });
// });
//
// describe('Should Return rules Data', function() {
//   describe('#findNotificationConfigurationPath()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         id:'5b3b49c8341d70505653d750',
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       }
//         rules.findNotificationConfigurationPath(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//
//       });
//     });
//   });
// });
//
//
//
// describe('Should Return rules Data', function() {
//   describe('#fetch()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         id:'5b3b49c8341d70505653d750',
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       }
//         rules.fetch(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//
//       });
//     });
//   });
// });
//
// describe('Should Edit rules Data', function() {
//   describe('#edit()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         id:'5b3b49c8341d70505653d750',
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       };
//       let values = {
//         id:'5b3b49c8341d70505653d750',
//         name:'Raman Parashar',
//         email:"raman.parashar.dce@gmail.com"
//       };
//         rules.edit(params,values).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//          expect(data.name).to.not.equal(null);
//          expect(data.email).to.not.equal(null);
//         });
//     });
//   });
// });
//
// describe('Should Edit rules Data', function() {
//   describe('#remove()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         id:'5b3b49c8341d70505653d750',
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       };
//         rules.remove(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//         });
//     });
//   });
// });
