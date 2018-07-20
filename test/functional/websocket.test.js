/**
 *
 * @type {"assert".internal | ((value: any, message?: string) => void)}
 */

let chai = require('chai');
let expect = chai.expect;
const websocket = require('../../api/websocket/services/Websocket');


describe('Should Return websocket Data', function() {
  describe('#log()', function() {
    it('should return data when the value is passed', function() {
      let logs = 'test_string';
      const data =  websocket.log(logs);
         expect(data).to.not.equal(null);
    });
  });
});

describe('Should Return websocket Data', function() {
  describe('#health()', function() {
    it('should return data when the value is passed', function() {
      let params = {
        id:'5b3b49c8341d70505653d750',
        websiteLive:'Useinfluence.co',
        notificationCount:34,
        uniqueUsers:12
      }
        const data= websocket.health(params);
         expect(data).to.not.equal(null);


    });
  });
});
