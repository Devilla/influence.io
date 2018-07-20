// /**
//  * Test picasaWeb and Gravatar
//  * @type {"assert".internal | ((value: any, message?: string) => void)}
//  */
// let chai = require('chai');
// let expect = chai.expect;
// const notificationpath = require('../../api/notificationpath/services/Notificationpath');
//
// const websiteUrl='';
// const isActive=false;
// describe('Should Return notificationpath Data', function() {
//   describe('#notificationpath-add()', function() {
//     it('should return data when the value is passed', function() {
//       let values = {
//         id:'5b3b49c8341d70505653d750'
//       };
//         notificationpath.add(values).then(function (data) {
//          expect(data).to.not.equal(null);
//       });
//     });
//   });
// });
//
//
// describe('Should Return notificationpath Data', function() {
//   describe('#fetchAll()', function() {
//     it('should return data when the value is passed', function() {
//       let values = {
//               id:'5b3b49c8341d70505653d750'
//             };
//         notificationpath.fetchAll(values).then(function (data) {
//          expect(data).to.not.equal(null);
//       });
//     });
//   });
// });
//
// describe('Should Return notificationpath Data', function() {
//   describe('#findRulesPath()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       }
//         notificationpath.findRulesPath(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//
//       });
//     });
//   });
// });
//
// describe('Should Return notificationpath Data', function() {
//   describe('#fetch()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       }
//         notificationpath.fetch(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//
//       });
//     });
//   });
// });
//
// describe('Should Edit notificationpath Data', function() {
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
//         notificationpath.edit(params,values).then(function (data) {
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
// describe('Should Edit notificationpath Data', function() {
//   describe('#remove()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       };
//         notificationpath.remove(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//         });
//     });
//   });
// });
