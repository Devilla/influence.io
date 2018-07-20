// /**
//  * Test picasaWeb and Gravatar
//  * @type {"assert".internal | ((value: any, message?: string) => void)}
//  */
// let chai = require('chai');
// let expect = chai.expect;;
// const client = require('../../api/client/services/Client');
//
// const websiteUrl='';
// const isActive=false;
// describe('Should Return Client Data', function() {
//   describe('#client-add()', function() {
//     it('should return data when the value is passed', function() {
//       let body = {
//               id:'5b3b49c83ee41d70505653d750'
//             }
//         client.add(body).then(function (data) {
//          expect(data).to.not.equal(null);
//       });
//     });
//   });
// });
//
// describe('Should Return Client Data', function() {
//   describe('#fetchAll()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         id:'5b3b49c83ee41d70505653d750',
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       }
//         client.fetchAll(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//
//       });
//     });
//   });
// });
//
// describe('Should Return client Data', function() {
//   describe('#fetch()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         id:'5b3b49c83ee41d70505653d750',
//         websiteLive:'Useinfluence.co',
//         notificationCount:34,
//         uniqueUsers:12
//       }
//         client.fetch(params).then(function (data) {
//          expect(data.websiteLive).to.not.equal(null);
//          expect(data.notificationCount).to.not.equal(null);
//          expect(data.uniqueUsers).to.not.equal(null);
//
//       });
//     });
//   });
// });
//
// describe('Should Edit client Data', function() {
//   describe('#edit()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//               id:'5b3b49c83ee41d70505653d750'
//             }
//       let values = {
//         name:'Raman Parashar',
//         email:"raman.parashar.dce@gmail.com"
//       };
//         client.edit(params,values).then(function (data) {
//          expect(data).to.equal(null);
//         });
//     });
//   });
// });
//
// describe('Should REmove client Data', function() {
//   describe('#remove()', function() {
//     it('should return data when the value is passed', function() {
//       let params = {
//         id:'5b3b49c83ee41d70505653d750',
//             }
//         client.remove(params).then(function (data) {
//          expect(data).to.not.equal(null);
//         });
//     });
//   });
// });
