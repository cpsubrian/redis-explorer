define(function (require) {

  var app = require('app')
    , Backbone = require('backbone');

  Backbone.sync = function(method, model, options) {
    options = options || {};
    switch (method) {
      case 'create':
        break;

      case 'update':
        break;

      case 'delete':
        //app.redis.del(model.id, handleRequest(options));
        break;

      case 'read':
        app.redis.get(model.id, handleRequest(options));
        break;
    }
  };

  // Handle a redis request.
  function handleRequest (options) {
    return function (err, result) {
      if (err && options.error) {
        options.error(err);
      }
      else if (options.success) {
        options.success(result, true);
      }
    };
  }

});