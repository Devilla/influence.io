// /**
//  * Test picasaWeb and Gravatar
//  * @type {"assert".internal | ((value: any, message?: string) => void)}
//  */
// let chai = require('chai');
// let expect = chai.expect;
// const token = require('../../api/token/services/Token');
//
// const websiteUrl='';
// const isActive=false;
// describe('Should Return token Data', function() {
//   describe('#token-add()', function() {
//     it('should return data when the value is passed', function() {
//       let values = {
//         id:'5b3b49c8341d70505653d750',
//         name:'Raman Parashar',
//         email:"raman.parashar.dce@gmail.com"
//       };
//         token.add(values).then(function (data) {
//          expect(data.name).not.to.equal(null);
//          expect(data.email).not.to.equal(null);
//       });
//     });
//   });
// });
//
//
// describe('Should Return token Data', function() {
//   describe('#fetchAll()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         id:'5b3b49c8341d70505653d750',
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       }
//         token.fetchAll(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//       });
//     });
//   });
// });
//
// describe('Should Return token Data', function() {
//   describe('#fetch()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         id:'5b3b49c8341d70505653d750',
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       }
//         token.fetch(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//
//       });
//     });
//   });
// });
//
// describe('Should Edit token Data', function() {
//   describe('#edit()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       };
//       let values = {
//         id:'5b3b49c8341d70505653d750',
//         name:'Raman Parashar',
//         email:"raman.parashar.dce@gmail.com"
//       };
//         token.edit(params,values).then(function (data) {
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
// describe('Should Edit token Data', function() {
//   describe('#remove()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         id:'5b3b49c8341d70505653d750',
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       };
//         token.remove(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//         });
//     });
//   });
// });
