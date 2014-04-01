define(function (require) {

  var app = require('app')
    , redis = nodejs.require('redis');

  app.redis = redis.createClient();
});