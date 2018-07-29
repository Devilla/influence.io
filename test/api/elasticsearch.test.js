/**
 * Test Elasticsearch Services !
 * @type {"assert".internal | ((value: any, message?: string) => void)}
 */

let chai = require('chai');
let expect = chai.expect;
const request = require('co-supertest');
const uuid = require('uuid/v4');

var trackingId = [
  "INF-406jkjiji00uszj",
  "INF-405gzoijjqu9mpg",
  "INF-405gzoijjr5ckll",
  "INF-405gzohjjzna2nb"
];

var randomTrackingId = trackingId[Math.floor(Math.random()*trackingId.length)];

/**
 * Test the elasticsearch data journey
 **/
  describe('elastic search journey data retrival test', () => {
    it('should return journey data', function *() {
      const trackingId = randomTrackingId;
      yield request('https://strapi.useinfluence.co')
      .get(`/elasticsearch/search/${trackingId}?type=journey`)
      .expect(200)
      .then((res) => {
        if(!res)
          throw res.error;
        const message = res.body.message;
        const userDetails = message.userDetails;
        expect(message).to.have.own.property('configuration');
        expect(message).to.have.own.property('response');
        expect(message).to.have.own.property('rule');
        expect(message).to.have.own.property('userDetails');
        expect(userDetails).to.be.an('array');
        // expect(userDetails).to.have.all.keys('trackingId');
      });
    });
  });

/**
 * Test the elasticsearch data identification
 **/
  describe('elastic search identification data retrival test', () => {
    it('should return identification data', function *() {
      yield request('https://strapi.useinfluence.co')
      .get(`/elasticsearch/search/${randomTrackingId}?type=identification`)
      .expect(200)
      .then((res) => {
        if(!res)
          throw res.error;
        const message = res.body.message;
        expect(message).to.have.own.property('configuration');
        expect(message).to.have.own.property('response');
        expect(message).to.have.own.property('rule');
      });
    });
  });

/**
 * Test the elasticsearch data live
 **/
  describe('elastic search live data retrival test', () => {
    it('should return live data', function *() {
      yield request('https://strapi.useinfluence.co')
      .get(`/elasticsearch/search/${randomTrackingId}?type=live`)
      .expect(200)
      .then((res) => {
        if(!res)
          throw res.error;
        const message = res.body.message;
        expect(message).to.have.own.property('configuration');
        expect(message).to.have.own.property('response');
        expect(message).to.have.own.property('rule');
      });
    });
  });
