/**
 * Test picasaWeb and Gravatar
 * @type {"assert".internal | ((value: any, message?: string) => void)}
 */
let chai = require('chai');
let expect = chai.expect;;
const client = require('../../api/client/services/Client');

const websiteUrl='';
const isActive=false;
describe('Should Return Client Data', function() {
  describe('#client-add()', function() {
    it('should return data when the value is passed', function() {
      let values = {
        name:'Raman Parashar',
        email:"raman.parashar.dce@gmail.com"
      };
        client.add(values).then(function (data) {
         expect(data.name).to.equal('Raman Parashar');
         expect(data.email).to.equal('raman.parashar.dce@gmail.com');
      });
    });
  });
});


describe('Should Return Client Data', function() {
  describe('#fetchAll()', function() {
    it('should return data when the value is passed', function() {
      let params = {
        websiteLive:'Useinfluence.co',
        notificationCount:34,
        uniqueUsers:12
      }
        client.fetchAll(params).then(function (data) {
         expect(data.websiteLive).to.notequal(null);
         expect(data.notificationCount).to.notequal(null);
         expect(data.uniqueUsers).to.notequal(null);

      });
    });
  });
});

describe('Should Return client Data', function() {
  describe('#fetch()', function() {
    it('should return data when the value is passed', function() {
      let params = {
        websiteLive:'Useinfluence.co',
        notificationCount:34,
        uniqueUsers:12
      }
        client.fetch(params).then(function (data) {
         expect(data.websiteLive).to.notequal(null);
         expect(data.notificationCount).to.notequal(null);
         expect(data.uniqueUsers).to.notequal(null);

      });
    });
  });
});

describe('Should Edit client Data', function() {
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
        client.edit(params,values).then(function (data) {
         expect(data.websiteLive).to.notequal(null);
         expect(data.notificationCount).to.notequal(null);
         expect(data.uniqueUsers).to.notequal(null);
         expect(data.name).to.notequal(null);
         expect(data.email).to.notequal(null);
        });
    });
  });
});

describe('Should Edit client Data', function() {
  describe('#remove()', function() {
    it('should return data when the value is passed', function() {
      let params = {
        websiteLive:'Useinfluence.co',
        notificationCount:34,
        uniqueUsers:12
      };
        client.remove(params).then(function (data) {
         expect(data.websiteLive).to.notequal(null);
         expect(data.notificationCount).to.notequal(null);
         expect(data.uniqueUsers).to.notequal(null);
        });
    });
  });
});
