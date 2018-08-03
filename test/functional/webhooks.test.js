// /**
//  * Test picasaWeb and Gravatar
//  * @type {"assert".internal | ((value: any, message?: string) => void)}
//  */
// let chai = require('chai');
// let expect = chai.expect;
// const webhooks = require('../../api/webhooks/services/Webhooks');
//
// const websiteUrl='';
// const isActive=false;
// describe('Should Return webhooks Data', function() {
//   describe('#webhooks-add()', function() {
//     it('should return data when the value is passed', function() {
//       let values = {
//         id:'5b3b49c8341d70505653d750'
//       };
//         webhooks.add(values).then(function (data) {
//          expect(data).to.not.equal(null);
//       });
//     });
//   });
// });
//
//
// describe('Should Return webhooks Data', function() {
//   describe('#fetch()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         id:'5b3b49c8341d70505653d750',
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       }
//         webhooks.fetch(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//
//       });
//     });
//   });
// });
//
// describe('Should Edit webhooks Data', function() {
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
//         webhooks.edit(params,values).then(function (data) {
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
// describe('Should Edit webhooks Data', function() {
//   describe('#remove()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         id:'5b3b49c8341d70505653d750',
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       };
//         webhooks.remove(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//         });
//     });
//   });
// });
