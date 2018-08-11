// var JwtBearerStrategy = require('passport-http-jwt-bearer');
//
// passport.use(new JwtBearerStrategy(
//   config.secret,
//   function(token, done) {
//     Token.findById(token._id, function (err, user) {
//
//      if (err) { return done(err); }
//      if (!user) { return done(null, false); }
//      return done(null, user, token);
//    });
//   }
// ));
//
//
// module.exports = async (ctx, next) => {
//   passport.authenticate('jwt-bearer', {session: false});
//   await next();
// };
