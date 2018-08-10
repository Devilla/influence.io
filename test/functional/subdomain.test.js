/**
 * Test Subdomain
 * @type {"assert".internal | ((value: any, message?: string) => void)}
 */
let chai = require('chai');
let expect = chai.expect;;
const campaign = require('../../api/subdomain/services/Subdomain');

const websiteUrl='';
const isActive=false;
describe('Should Return Subdomain Data', function() {
  describe('#campaignAdd()', function() {
    it('should return data when the value is passed', function() {
      let values = {
        websiteUrl: 'contact.useinfluence.co',
    		isActive: true
      }
        campaign.add(values).then(function (data) {
         expect(data.websiteUrl).to.equal('contact.useinfluence.co');
         expect(data.isActive).to.equal(true);
      });
    });
  });
});


// describe('Should Return Subdomain Data', function() {
//   describe('#fetchAllSubdomains()', function() {
//     it('should return data when the value is passed', function() {
//       let profile = {
//         _id:'5b3b49c8341d70505653d750'
//       }
//         campaign.fetchAll(profile._id).then(function (data) {
//          expect(data).to.not.equal(null);
//       });
//     });
//   });
// });

describe('Should Return Subdomain Data', function() {
  describe('#fetch()', function() {
    it('should return data when the value is passed', function() {
      let profile = {
        _id:'5b3b49c8341d70505653d750'
      }
        campaign.fetch(profile._id).then(function (data) {
         expect(data).to.not.equal(null);
      });
    });
  });
});

describe('Should Edit Subdomain Data', function() {
  describe('#edit()', function() {
    it('should return data when the value is passed', function() {
      let body = {
        _id:'5b3b49c8341d70505653d750'
      }
        try{campaign.edit(body).then(function (data) {
         expect(data).to.equal(null);
        });
      }catch(err){
        console.log(err);
      }
    });
  });
});

describe('Should Remove Subdomain Data', function() {
  describe('#remove()', function() {
    it('should return data when the value is passed', function() {
      let profile = {
        _id:'5b3b49c8341d70505653d750'
      }
        campaign.remove(profile._id).then(function (data) {
         expect(data).to.not.equal(null);
        });
    });
  });
});
