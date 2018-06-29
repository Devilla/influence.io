// var JwtStrategy = require('passport-jwt').Strategy;
// var ExtractJwt = require('passport-jwt').ExtractJwt;
//
// var opts = {};
// opts.secretOrKey =  config.secret;
// opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
//
// passport.use(new JwtStrategy(opts, function(jwt_payload, done){
//     User.find({id: jwt_payload.id}, function(err, user){
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//         }
//     })
// }));
//
// module.exports = async (ctx, next) => {
//   passport.authenticate('jwt', {session: false})
//   await next();
// };
