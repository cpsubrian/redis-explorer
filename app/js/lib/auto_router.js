define(function (require) {
  var ControllerRouter = require('lib/controller_router')
    , Marionette = require('marionette')
    , _ = require('underscore')
    , $ = require('jquery');

  /**
   * AutoRouter (no pun intended)
   *
   * Usage:
   *
   *    var MyRouter = AutoRouter.extend({
   *      autoRoutes: {
   *        '': 'home#home',
   *        'users': 'users#list',
   *        'users/:id': 'users#show'
   *      },
   *
   *      onLoaded: function () {
   *        // This will be called after all your routes have been loaded.
   *        Backbone.history.start();
   *      }
   *    });
   *
   *    var router = new MyRouter();
   */
  var AutoRouter = ControllerRouter.extend({

    constructor: function () {
      var self = this, tasks = [];

      this.triggerMethod = Marionette.triggerMethod;

      if (this.autoRoutes) {
        this.controllerRoutes = this.controllerRoutes || {};
        _(this.autoRoutes).chain().keys().forEach(function (url) {
          var target = self.autoRoutes[url]
            , parts = target.split('#')
            , controllerName = parts[0]
            , method = parts[1];

          tasks.push(self.addAutoRoute(controllerName, url, method));
        });
      }

      $.when.apply($, tasks).then(function () {
        ControllerRouter.prototype.constructor.apply(self, arguments);
        self.triggerMethod('loaded');
      });
    },

    addAutoRoute: function (controllerName, url, method) {
      var self = this
        , dfd = $.Deferred();

      require(['controllers/routes/' + controllerName + '_controller'], function (controller) {
        self.controllerRoutes[controllerName] = self.controllerRoutes[controllerName] || {
          controller: controller,
          routes: {}
        };
        self.controllerRoutes[controllerName].routes[url] = method;
        dfd.resolve();
      });

      return dfd;
    }

  });

  return AutoRouter;
});