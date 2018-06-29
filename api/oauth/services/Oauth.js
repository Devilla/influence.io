'use strict';

/**
 * Oauth.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
var oauth2orize = require('oauth2orize')
var jwt = require('jwt-simple');

var server = oauth2orize.createServer();

// Register serialialization function
server.serializeClient(function(client, callback) {
  return callback(null, client._id);
});

// Register deserialization function
server.deserializeClient(function(id, callback) {
  Client.findOne({ _id: id }, function (err, client) {
    if (err) { return callback(err); }
    return callback(null, client);
  });
});

// Register authorization code grant type
server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares, callback) {
  // Create a new authorization code
  var code = new Code({
    value: uid(16),
    clientId: client._id,
    redirectUri: redirectUri,
    userId: client.userId
  });

  // Save the auth code and check for errors
  code.save(function(err) {
    if (err) { return callback(err); }

    callback(null, code.value);
  });
}));

// Register exchange code grant type
server.exchange(oauth2orize.exchange.code(function(client, code, redirectUri, callback) {
  Code.findOne({ value: code }, function (err, authCode) {
    if (err) { return callback(err); }
    if (authCode === undefined) { return callback(null, false); }
    if (client._id.toString() !== authCode.clientId) { return callback(null, false); }
    if (redirectUri !== authCode.redirectUri) { return callback(null, false); }

    // Delete auth code now that it has been used
    authCode.remove(function (err) {
      if(err) { return callback(err); }

      // Create a new access token
      var token = new Token({
        value: uid(256),
        clientId: authCode.clientId,
        userId: authCode.userId
      });

      // Save the access token and check for errors
      token.save(function (err) {
        if (err) { return callback(err); }
        var enctoken = jwt.encode(token, config.secret);
        callback(null, enctoken);
      });
    });
  });
}));

// User authorization endpoint
// exports.authorization = [
//   server.authorization(function(clientId, redirectUri, callback) {
//     Client.findOne({ id: clientId }, function (err, client) {
//       if (err) { return callback(err); }
//
//       return callback(null, client, redirectUri);
//     });
//   }),
//   function(req, res){
//     console.log(config.userid);
//     res.render('dialog', { transactionID: req.oauth2.transactionID, user: config.userid, client: req.oauth2.client });
//   }
// ]

// exports.decision = [
//   server.decision()
// ]

// Application client token exchange endpoint
// exports.token = [
//   server.token(),
//   server.errorHandler()
// ]

function uid (len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {

  /**
   * Promise for client authorization.
   * @param {clientId}
   * @param {redirectUri}
   * @return {Promise}
   */

  authorization: (clientId, redirectUri) => {
    Client.findOne({ id: clientId }, function (err, client) {
      if (err) {
        return { message: err, error: true };
      }

      return {client, redirectUri, error: false};
    });
  },

  /**
   * Promise to make a authorize oauth decision.
   *
   * @return {Promise}
   */

  decision: async () => {
    return server.decision();
  },

  /**
   * Promise to get a/an oauth token.
   *
   * @return {Promise}
   */

  token: async () => {
    return server.token();
  }

};
