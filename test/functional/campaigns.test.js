// /**
//  * Test picasaWeb and Gravatar
//  * @type {"assert".internal | ((value: any, message?: string) => void)}
//  */
// let chai = require('chai');
// let expect = chai.expect;;
// const campaign = require('../../api/campaign/services/Campaign');
//
// const websiteUrl='';
// const isActive=false;
// describe('Should Return Campaign Data', function() {
//   describe('#campaignAddfromAdd()', function() {
//     it('should return data when the value is passed', function() {
//       let values = {
//         websiteUrl: 'Useinfluence.co'.toLowerCase().replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0],
//     		isActive: true
//       }
//         campaign.add(values).then(function (data) {
//          expect(data.websiteUrl).to.equal('useinfluence.co');
//          expect(data.isActive).to.equal(true);
//       });
//     });
//   });
// });
//
//
// describe('Should Return Campaign Data', function() {
//   describe('#fetchUserCampaigns()', function() {
//     it('should return data when the value is passed', function() {
//       let profile = {
//         _id:'5b3b49c8341d70505653d750'
//       }
//         campaign.fetchUserCampaigns(profile._id).then(function (data) {
//          expect(data).to.not.equal(null);
//       });
//     });
//   });
// });
//
// describe('Should Return Campaign Data', function() {
//   describe('#fetchUserCampaignsInfo()', function() {
//     it('should return data when the value is passed', function() {
//       let profile = {
//         _id:'5b3b49c8341d70505653d750'
//       }
//         campaign.fetchUserCampaignsInfo(profile._id).then(function (data) {
//          expect(data).to.not.equal(null);
//       });
//     });
//   });
// });
//
// describe('Should Edit Campaign Data', function() {
//   describe('#edit()', function() {
//     it('should return data when the value is passed', function() {
//       let body = {
//         _id:'5b3b49c8341d70505653d750'
//       }
//         try{campaign.edit(body).then(function (data) {
//          expect(data).to.equal(null);
//         });
//       }catch(err){
//         console.log(err);
//       }
//     });
//   });
// });
//
// describe('Should Remove Campaign Data', function() {
//   describe('#remove()', function() {
//     it('should return data when the value is passed', function() {
//       let profile = {
//         _id:'5b3b49c8341d70505653d750'
//       }
//         campaign.remove(profile._id).then(function (data) {
//          expect(data).to.not.equal(null);
//         });
//     });
//   });
// });
