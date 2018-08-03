/**
 * Test picasaWeb and Gravatar
 * @type {"assert".internal | ((value: any, message?: string) => void)}
 */
let chai = require('chai');
let expect = chai.expect;;
const enrichment = require('../../api/enrichment/services/Enrichment');


describe('Should Return Email Data', function() {
  describe('#emailEnrichmentfromPicasaWeb()', function() {
    it('should return data when the value is passedt', function() {
      let email = "kirti.prakash1990@gmail.com";
        enrichment.picasaWeb(email).then(function (data) {
        expect(data.username).to.equal('Kirti Prakash');
        expect(data.profile_pic).to.equal('https://lh3.googleusercontent.com/-AMztD5XJtwA/AAAAAAAAAAI/AAAAAAAAAAA/1bEdSnwxrMo/s64-c/115988417621641284488.jpg');
      });
    });
  });
});

describe('Should Return Email Data From Gravatar', function() {
  describe('#emailEnrichmentfromGravatar()', function() {
    it('should return data when value is passed', function() {
      let email = "kirti.prakash1990@gmail.com";
      enrichment.gravatr(email).then(function (data) {
        expect(data.username).to.equal('kirtiprakash1990');
        expect(data.profile_pic).to.equal('https://secure.gravatar.com/avatar/0358cfa11ad87cf602668978c4f4140f');
      });
    });
  });
});
