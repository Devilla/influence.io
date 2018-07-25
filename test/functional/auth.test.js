/**
 * Test picasaWeb and Gravatar
 * @type {"assert".internal | ((value: any, message?: string) => void)}
 */
let chai = require('chai');
let expect = chai.expect;;
const auth = require('../../plugins/users-permissions/controllers/Auth');
var Chance = require('chance'),
    chance = new Chance();

// const email = chance.email();
// const password = chance.zip();
const request = { request:
   { method: 'POST',
     url: '/auth/local/register',
     body: {
       email: chance.email(),
       password: chance.zip(),
       username: chance.name()
     },
     header:
      { 'content-type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache',
        'postman-token': 'f65c9d89-ac06-46c1-bc4c-01ec526e6ded',
        'user-agent': 'PostmanRuntime/7.1.1',
        accept: '*/*',
        host: 'localhost:1337',
        cookie: 'connect.sid=s%3AKO1Dz2b49cuhhrYL3vaBolGeIdWdoTd-.Zd2Yz%2Fy62szVlH1w1TGDuP0uCFYeHWMmPyaXndMTkiY',
        'accept-encoding': 'gzip, deflate',
        'content-length': '41',
        connection: 'keep-alive' } },
  response:
    {
      status: 200,
      message: 'OK',
      header:{
        vary: 'Origin',
        'content-type': 'application/json; charset=utf-8'
      }
    },
  app: { subdomainOffset: 2, proxy: false, env: 'development' },
  originalUrl: '/auth/local/register',
  req: '<original node req>',
  res: '<original node res>',
  socket: '<original node socket>',
  badRequest: function(result, err) {
    if(err)
      throw err;
    return result;
  },
  send: function(result, err) {
    if(err)
      return err;
    return result;
  }
};

describe('Should create a user', () => {
  describe('#newusercreatedfromRegister()', () => {
    it('should return new user with jwt', async () => {
      console.log(request.res);
      await auth.register(request).then(function(data) {
        console.log(data);
      });
    });
  });
});
