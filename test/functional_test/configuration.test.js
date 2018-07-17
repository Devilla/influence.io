/**
 * Test picasaWeb and Gravatar
 * @type {"assert".internal | ((value: any, message?: string) => void)}
 */
let chai = require('chai');
let expect = chai.expect;;
const configuration = require('../../api/configuration/services/Configuration');

const websiteUrl='';
const isActive=false;
describe('Should Return configuration Data', function() {
  describe('#configuration-add()', function() {
    it('should return data when the value is passed', function() {
      let values = {
        name:'Raman Parashar',
        email:"raman.parashar.dce@gmail.com"
      };
        configuration.add(values).then(function (data) {
         expect(data.name).to.equal('Raman Parashar');
         expect(data.email).to.equal('raman.parashar.dce@gmail.com');
      });
    });
  });
});


describe('Should Return configuration Data', function() {
  describe('#fetchAll()', function() {
    it('should return data when the value is passed', function() {
      let params = {
        websiteLive:'Useinfluence.co',
        notificationCount:34,
        uniqueUsers:12
      }
        configuration.fetchAll(params).then(function (data) {
         expect(data.websiteLive).to.notequal(null);
         expect(data.notificationCount).to.notequal(null);
         expect(data.uniqueUsers).to.notequal(null);

      });
    });
  });
});

describe('Should Return configuration Data', function() {
  describe('#fetchOneConfig()', function() {
    it('should return data when the value is passed', function() {
      let params = {
        websiteLive:'Useinfluence.co',
        notificationCount:34,
        uniqueUsers:12
      }
        configuration.fetchOneConfig(params).then(function (data) {
         expect(data.websiteLive).to.notequal(null);
         expect(data.notificationCount).to.notequal(null);
         expect(data.uniqueUsers).to.notequal(null);

      });
    });
  });
});

describe('Should Return configuration Data', function() {
  describe('#fetchCampaign()', function() {
    it('should return data when the value is passed', function() {
      let params = {
        websiteLive:'Useinfluence.co',
        notificationCount:34,
        uniqueUsers:12
      }
        configuration.fetchCampaign(params).then(function (data) {
         expect(data.websiteLive).to.notequal(null);
         expect(data.notificationCount).to.notequal(null);
         expect(data.uniqueUsers).to.notequal(null);

      });
    });
  });
});

describe('Should Edit configuration Data', function() {
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
        configuration.edit(params,values).then(function (data) {
         expect(data.websiteLive).to.notequal(null);
         expect(data.notificationCount).to.notequal(null);
         expect(data.uniqueUsers).to.notequal(null);
         expect(data.name).to.notequal(null);
         expect(data.email).to.notequal(null);
        });
    });
  });
});

describe('Should Edit configuration Data', function() {
  describe('#remove()', function() {
    it('should return data when the value is passed', function() {
      let params = {
        websiteLive:'Useinfluence.co',
        notificationCount:34,
        uniqueUsers:12
      };
        configuration.remove(params).then(function (data) {
         expect(data.websiteLive).to.notequal(null);
         expect(data.notificationCount).to.notequal(null);
         expect(data.uniqueUsers).to.notequal(null);
        });
    });
  });
});
