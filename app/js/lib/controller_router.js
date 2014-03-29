define(function (require) {
  var Marionette = require('marionette')
    , _ = require('underscore');

  /**
   * ControllerRouter
   *
   * Binds routes to multiple different controllers. Usage:
   *
   *    MyRouter = ControllerRouter.extend({
   *      controllerRoutes: {
   *        'home': {
   *          controller: homeController,
   *          routes: {
   *            '': 'home'
   *          }
   *        },
   *        'users': {
   *          controller: usersController,
   *          routes: {
   *            'users': 'listUsers',
   *            'users/:id', 'showUser'
   *          }
   *        }
   *      }
   *    });
   *
   *    var router = new MyRouter();
   */
  var ControllerRouter = Marionette.AppRouter.extend({
    constructor: function () {
      var self = this;
      Marionette.AppRouter.prototype.constructor.apply(this, arguments);

      if (this.controllerRoutes) {
        _(this.controllerRoutes).chain().keys().forEach(function (name) {
          var controller = self.controllerRoutes[name].controller
            , routes = self.controllerRoutes[name].routes;

          if (controller && routes) {
            self.processAppRoutes(controller, routes);
          }
        });
      }
    }
  });

  return ControllerRouter;
});