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
              if (err) return error(err);
              success({id: model.id, type: type, value: resp});
            });
          }
          else if (type === 'list') {
            app.redis.llen(model.id, function (err, len) {
              if (err) return error(err);
              success({id: model.id, type: type, value: app.format.plural(len, 'list item', 'list items')});
            });
          }
          else if (type === 'set') {
            app.redis.scard(model.id, function (err, len) {
              if (err) return error(err);
              success({id: model.id, type: type, value: app.format.plural(len, 'set member', 'set members')});
            });
          }
          else if (type === 'zset') {
            app.redis.zcard(model.id, function (err, len) {
              if (err) return error(err);
              success({id: model.id, type: type, value: app.format.plural(len, 'set member', 'set members')});
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