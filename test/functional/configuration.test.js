// /**
//  * Test picasaWeb and Gravatar
//  * @type {"assert".internal | ((value: any, message?: string) => void)}
//  */
// let chai = require('chai');
// let expect = chai.expect;;
// const configuration = require('../../api/configuration/services/Configuration');
//
// const websiteUrl='';
// const isActive=false;
// describe('Should Return configuration Data', function() {
//   describe('#configuration-add()', function() {
//     it('should return data when the value is passed', function() {
//       let body = {
//                id:'5b3b49c8341d70505653d750'
//              }
//         configuration.add(body).then(function (data) {
//          expect(data  ).to.not.equal(null);
//       });
//     });
//   });
// });
//
//
// describe('Should Return configuration Data', function() {
//   describe('#fetchAll()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       }
//         configuration.fetchAll(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//
//       });
//     });
//   });
// });
//
// describe('Should Return configuration Data', function() {
//   describe('#fetchOneConfig()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       }
//         configuration.fetchOneConfig(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//
//       });
//     });
//   });
// });
//
// describe('Should Return configuration Data', function() {
//   describe('#fetchCampaign()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         id:'5b3b49c83ee41d70505653d750',
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       }
//         configuration.fetchCampaign(params).then(function (data) {
//          expect(data).to.not.equal(null);
//
//       });
//     });
//   });
// });
//
// describe('Should Edit configuration Data', function() {
//   describe('#edit()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       };
//       let values = {
//         name:'Raman Parashar',
//         email:"raman.parashar.dce@gmail.com"
//       };
//         configuration.edit(params,values).then(function (data) {
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
// describe('Should Edit configuration Data', function() {
//   describe('#remove()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       };
//         configuration.remove(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//         });
//     });
//   });
// });
