define(function (require) {

  var app = require('app')
    , Backbone = require('backbone');

  Backbone.sync = function(method, model, options) {
    options = options || {};

    // Handle a redis error.
    function error (err) {
      if (options.error) options.error(err);
    }

    // Handle success.
    function success (resp) {
      if (options.success) options.success(resp);
    }

    switch (method) {
      case 'create':
        break;

      case 'update':
        break;

      case 'delete':
        //app.redis.del(model.id, handleRequest(options));
        break;

      case 'read':
        app.redis.type(model.id, function (err, type) {
          if (err) return error(err);
          if (type === 'string') {
            app.redis.get(model.id, function (err, resp) {
              if (err) error(err);
              success({id: model.id, type: type, value: resp});
            });
          }
          else {
            success({id: model.id, type: type});
          }
        });
        break;
    }
  };
});