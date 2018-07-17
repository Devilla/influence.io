/**
 * Test picasaWeb and Gravatar
 * @type {"assert".internal | ((value: any, message?: string) => void)}
 */
let chai = require('chai');
let expect = chai.expect;;
const code = require('../../api/code/services/Code');

const websiteUrl='';
const isActive=false;
describe('Should Return code Data', function() {
  describe('#code-add()', function() {
    it('should return data when the value is passed', function() {
      let values = {
        name:'Raman Parashar',
        email:"raman.parashar.dce@gmail.com"
      };
        code.add(values).then(function (data) {
         expect(data.name).to.equal('Raman Parashar');
         expect(data.email).to.equal('raman.parashar.dce@gmail.com');
      });
    });
  });
});


describe('Should Return code Data', function() {
  describe('#fetchAll()', function() {
    it('should return data when the value is passed', function() {
      let params = {
        websiteLive:'Useinfluence.co',
        notificationCount:34,
        uniqueUsers:12
      }
        code.fetchAll(params).then(function (data) {
         expect(data.websiteLive).to.notequal(null);
         expect(data.notificationCount).to.notequal(null);
         expect(data.uniqueUsers).to.notequal(null);

      });
    });
  });
});

describe('Should Return code Data', function() {
  describe('#fetch()', function() {
    it('should return data when the value is passed', function() {
      let params = {
        websiteLive:'Useinfluence.co',
        notificationCount:34,
        uniqueUsers:12
      }
        code.fetch(params).then(function (data) {
         expect(data.websiteLive).to.notequal(null);
         expect(data.notificationCount).to.notequal(null);
         expect(data.uniqueUsers).to.notequal(null);

      });
    });
  });
});

describe('Should Edit code Data', function() {
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
        code.edit(params,values).then(function (data) {
         expect(data.websiteLive).to.notequal(null);
         expect(data.notificationCount).to.notequal(null);
         expect(data.uniqueUsers).to.notequal(null);
         expect(data.name).to.notequal(null);
         expect(data.email).to.notequal(null);
        });
    });
  });
});

describe('Should Edit code Data', function() {
  describe('#remove()', function() {
    it('should return data when the value is passed', function() {
      let params = {
        websiteLive:'Useinfluence.co',
        notificationCount:34,
        uniqueUsers:12
      };
        code.remove(params).then(function (data) {
         expect(data.websiteLive).to.notequal(null);
         expect(data.notificationCount).to.notequal(null);
         expect(data.uniqueUsers).to.notequal(null);
        });
    });
  });
});
