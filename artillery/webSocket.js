

function generateRandomData( userContext, events, done ) {
  // generate data with Faker:

  // add variables to virtual user's context:

    userContext.vars.name = { "json": {
        "path": "/visitors/events/",
        "value": {
            "source": {
                "url": {
                    "hostname": "localhost",
                    "pathname": "/signup",
                    "protocol": "http:",
                    "host": "localhost:3000"
                }
            },
            "sessionId": "45f67582-95b8-d15c-e3e3-939a7bbb2fe8",
            "form": {
                "formId": "26f23cdb-c385-5318-38ca-007e59c62f66",
                "email": "ray101@gmail.com",
                "anonymous": "Create Account"
            },
            "timestamp": "2018-07-29T10:39:38.099Z",
            "event": "formsubmit",
            "fingerprint": "94a17e0ab2893d32f4e0936e189dbb39",
            "visitorId": "0afaba71-0a0f-3f2d-dc09-4fde4278d5e4",
            "geo": {
                "city": "Delhi",
                "country": "India",
                "ip": "103.206.220.159",
                "latitude": 28.6667,
                "longitude": 77.2167
            },
            "trackingId": "INF-406jkjiji00uszj"
        },
        "log": ""
    }
    };

    return done();

}

module.exports = generateRandomData;
