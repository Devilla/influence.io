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
          console.log(data,'============DATA============');
         expect(data.websiteUrl).to.equal('useinfluence.co');
         expect(data.isActive).to.equal(true);
      });
    });
  });
});


describe('Should Return Campaign Data', function() {
  describe('#fetchUserCampaigns()', function() {
    it('should return data when the value is passed', function() {
      let values = {
        websiteUrl: 'Useinfluence.co'.toLowerCase().replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0],
    		isActive: true
      }
        campaign.fetchUserCampaigns(values).then(function (data) {
          console.log(data,'============DATA============');
         expect(data.websiteUrl).to.equal('useinfluence.co');
         expect(data.isActive).to.equal(true);
      });
    });
  });
});
