/**
 * Test picasaWeb and Gravatar
 * @type {"assert".internal | ((value: any, message?: string) => void)}
 */
let chai = require('chai');
let expect = chai.expect;;
const campaign = require('../../api/campaign/services/Campaign');

const websiteUrl='';
const isActive=false;
describe('Should Return Campaign Data', function() {
  describe('#campaignAddfromAdd()', function() {
    it('should return data when the value is passed', function() {
      let values = {
        websiteUrl: 'Useinfluence.co'.toLowerCase().replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0],
    		isActive: true
      }
        campaign.add(values).then(function (data) {
         expect(data.websiteUrl).to.equal('useinfluence.co');
         expect(data.isActive).to.equal(true);
      });
    });
  });
});


describe('Should Return Campaign Data', function() {
  describe('#fetchUserCampaigns()', function() {
    it('should return data when the value is passed', function() {
      let params = {
        websiteLive:'Useinfluence.co',
        notificationCount:34,
        uniqueUsers:12
      }
        campaign.fetchUserCampaigns(params).then(function (data) {
         expect(data.websiteLive).to.notequal(null);
         expect(data.notificationCount).to.notequal(null);
         expect(data.uniqueUsers).to.notequal(null);

      });
    });
  });
});

describe('Should Return Campaign Data', function() {
  describe('#fetchUserCampaignsInfo()', function() {
    it('should return data when the value is passed', function() {
      let params = {
        websiteLive:'Useinfluence.co',
        notificationCount:34,
        uniqueUsers:12
      }
        campaign.fetchUserCampaignsInfo(params).then(function (data) {
         expect(data.websiteLive).to.notequal(null);
         expect(data.notificationCount).to.notequal(null);
         expect(data.uniqueUsers).to.notequal(null);

      });
    });
  });
});

describe('Should Edit Campaign Data', function() {
  describe('#edit()', function() {
    it('should return data when the value is passed', function() {
      let params = {
        websiteLive:'Useinfluence.co',
        notificationCount:34,
        uniqueUsers:12
      };
      let values = {
        name:'Raman Parashar',
        email:"raman.parashar.dce@gmail.com"
      };
        campaign.edit(params,values).then(function (data) {
         expect(data.websiteLive).to.notequal(null);
         expect(data.notificationCount).to.notequal(null);
         expect(data.uniqueUsers).to.notequal(null);
         expect(data.name).to.notequal(null);
         expect(data.email).to.notequal(null);
        });
    });
  });
});

describe('Should Edit Campaign Data', function() {
  describe('#remove()', function() {
    it('should return data when the value is passed', function() {
      let params = {
        websiteLive:'Useinfluence.co',
        notificationCount:34,
        uniqueUsers:12
      };
        campaign.remove(params).then(function (data) {
         expect(data.websiteLive).to.notequal(null);
         expect(data.notificationCount).to.notequal(null);
         expect(data.uniqueUsers).to.notequal(null);
        });
    });
  });
});
