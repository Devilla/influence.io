/**
 * Test Websocket logging Services !
 * @type {"assert".internal | ((value: any, message?: string) => void)}
 */

let chai = require('chai');
let expect = chai.expect;;
const websocket = require('../api/websocket/services/Websocket');


describe('Should Send Data to Logger', function() {
  describe('#webSocketLoggingtoStackDriver()', function() {
    it('should send data when message is passed', function() {
      let message = {"path":"/visitors/events/","value":
          {"fingerprint":"da1b1740fd69d014869921fa518a387b","sessionId":"b0b63723-cb51-bf84-f0f1-8cafc382aad0",
            "visitorId":"61296e8c-3adb-cd2e-91b2-f98042c0eff8","trackingId":"INF-406jkjiji00uszj","userId":null,"userProfile":null,
            "geo":{"latitude":18.5333,"longitude":73.8667,"city":"Pune","country":"India","ip":"106.210.186.176"},
            "target":{"url":{"host":"useinfluence.co","hostname":"useinfluence.co","pathname":"/campaigns","protocol":"https:"},
              "selector":"div#root:nth-child(2)>div.dashboard-container:nth-child(1)>div.wrapper:nth-child(2)>div#sidebar.sidebar:nth-child(2)>div.sidebar-wrapper:nth-child(2)>ul.nav:nth-child(1)>li:nth-child(4)>a.nav-link:nth-child(1)>p:nth-child(2)"},
            "timestamp":"2018-06-13T15:41:58.152Z","event":"click","source":{"url":{"host":"useinfluence.co","hostname":"useinfluence.co","pathname":"/profile","protocol":"https:"}}}};

      websocket.log(message).then(function (data) {
        expect(data).to.equal('');
        expect(data).to.equal('');
      });
    });
  });
});
