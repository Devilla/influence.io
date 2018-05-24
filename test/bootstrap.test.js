const strapi = require('strapi');

before(function (done) {
  strapi.start({}, function(err) {
    if (err) {
      return done(err);
    }
    done(err, strapi);
  });
});


after(function (done) {
  strapi.stop(done());
});
