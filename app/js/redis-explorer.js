define(function (require) {

  var app = require('app')
    , Backbone = require('backbone')
    , Router = require('lib/router')
    , errorController = require('controllers/routes/error_controller')
    , RedisExplorerRouter;

  // Define app regions.
  app.addRegions({
    'left': '.left-sidebar',
    'main': '.main'
  });

  // Load plugins.
  require('plugins/errors');
  require('plugins/mixins');
  require('plugins/handlebars');
  require('plugins/navigate');
  require('plugins/views');
  require('plugins/redis');
  require('plugins/sync');
  require('plugins/format');

  // Router.
  RedisExplorerRouter = Router.extend({
    autoRoutes: {
      '*path': 'error#error404',
      '': 'home#index'
    }
  });
  app.router = new RedisExplorerRouter();

  return app;
});