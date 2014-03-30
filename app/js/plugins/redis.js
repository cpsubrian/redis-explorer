define(function (require) {

  var app = require('app')
    , redis = requireNode('redis');

  app.redis = redis.createClient();

});