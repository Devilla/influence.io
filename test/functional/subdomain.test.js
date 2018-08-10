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

        websiteUrl: 'subdomain.co',
    		isActive: true
      }
        campaign.add(values).then(function (data) {
         expect(data).to.not.equal(null);
      });
    });
  });
});


describe('Should Return Subdomain Data', function() {
  describe('#fetchAllSubdomains()', function() {
    it('should return data when the value is passed', function() {
      let profile = {
        _id:'5b5af8ee41c6d400121b28ba',
        websiteUrl: 'subdomain.co',
      }
        campaign.fetchAll(profile._id).then(function (data) {
         expect(data).to.not.equal(null);
      });
    });
  });
});

describe('Should Return Subdomain Data', function() {
  describe('#fetch()', function() {
    it('should return data when the value is passed', function() {
      let params = {
        _id:'5b5af8ee41c6d400121b28ba'
      }
        campaign.fetch(params._id).then(function (data) {
         expect(data).to.not.equal(null);
      });
    });
  });
});

describe('Should Edit Subdomain Data', function() {
  describe('#edit()', function() {
    it('should return data when the value is passed', function() {
      let params = {
        _id:'5b5af8ee41c6d400121b28ba'
      }
      let values = {
        websiteUrl: 'subdomain.co'
      }
        try{campaign.edit(params,values).then(function (data) {
         expect(data).to.not.equal(null);
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
      let params = {
        _id:'5b5af8ee41c6d400121b28ba'
      }
        campaign.remove(params).then(function (data) {
         expect(data).to.not.equal(null);
        });
    });
  });
});
