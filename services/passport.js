const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
      .then(user => {
        done(null, user);
      });
});

passport.use(new GoogleStrategy({
  clientID:keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL : '/auth/google/callback',
  passReqToCallback :true,
  proxy:true
}, (connect,accessToken, refreshToken, profile,done) => {
  //console.log(profile.name.givenName+ " "+ profile.name.familyName);
      User.findOne({ googleID :profile.id})
        .then((existingUser) => {
          if(existingUser) {
            // we alredy has a record for this user
            done(null, existingUser);
            //everythings fine! first error parameter = null
          }else{

            new User({
               googleID : profile.id,
               name : profile.name.givenName+ " "+ profile.name.familyName
            }).save()
            .then(user => done(null, user));
          }
        });
}));
