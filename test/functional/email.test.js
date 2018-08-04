// /**
//  * Test Email Services !
//  * @type {"assert".internal | ((value: any, message?: string) => void)}
//  */
//
// let chai = require('chai');
// let expect = chai.expect;;
// const email = require('../../plugins/email/services/Email');
//
//
// describe('Should Send Email ', function() {
//   describe('#sendEmailUsingSendGrid()', function() {
//     it('should return ok', function() {
//       let options = {
//         to:"info@influence.com",
//         from:"noreply@influence.co",
//         subject: 'Sending with SendGrid is Fun and its a test',
//         text: 'and easy to do anywhere, even with Node.js',
//         html: '<strong>and easy to do anywhere, even with Node.js</strong>'
//       };
//       email.send(options).then(function (data) {
//         expect(data.statusCode).to.equal('202');
//         expect(data.statusMessage).to.equal('Accepted');
//       });
//     });
//   });
// });
//
// describe('Should Send Account Created Email ', function() {
//   describe('#sendEmailUsingSendGrid()', function() {
//     it('should send account email ok', function() {
//       let emailAddress = 'kirti.prakash1990@gmail.com';
//       let name = 'Kirti Prakash ';
//       email.accountCreated(emailAddress,name).then(function (data) {
//         expect(data.statusCode).to.equal('202');
//         expect(data.statusMessage).to.equal('Accepted');
//       });
//     });
//   });
// });
//
// describe('Should Send Password Reset Token Email ', function() {
//   describe('#sendEmailUsingSendGrid()', function() {
//     it('should send password reset email ok', function() {
//       let emailAddress = 'kirti.prakash1990@gmail.com';
//       let name = 'Kirti Prakash ';
//       let passwordToken = 'resetToken';
//       email.resetPassword(emailAddress,name, passwordToken).then(function (data) {
//         expect(data.statusCode).to.equal('202');
//         expect(data.statusMessage).to.equal('Accepted');
//       });
//     });
//   });
// });
