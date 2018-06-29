// var BasicStrategy = require('passport-http').BasicStrategy;
//
// passport.use('basic-strategy', new BasicStrategy(
//   function(username, password, callback) {
//
//     Client.findOne({ id: username }, function (err, client) {
//       if (err) { return callback(err); }
//
//       // No client found with that id or bad password
//       if (!client || client.secret !== password) { return callback(null, false); }
//       // Success
//       return callback(null, client);
//     });
//   }
// ));
//
// module.exports = async (ctx, next) => {
//   passport.authenticate('basic-strategy', { session : false });
//   await next();
// };
