define(function (require) {
  var AutoRouter = require('lib/auto_router')
    , Backbone = require('backbone')
    , errorController = require('controllers/routes/error_controller');

  var Router = AutoRouter.extend({
    constructor: function () {
      this.history = [];
      AutoRouter.prototype.constructor.apply(this, arguments);
    },
    onLoaded: function () {
      if (!Backbone.history.start()) {
        errorController.error404();
      }
    },
    refresh: function () {
      Backbone.history.loadUrl(Backbone.history.fragment);
    },
    route: function () {
      this.trigger('before:route');
      AutoRouter.prototype.route.apply(this, arguments);
    },
    navigate: function () {
      var args = Array.prototype.slice.call(arguments, 0);

      // Track history of navigate calls.
      if (arguments[1] && arguments[1].replace) {
        this.history[0] = arguments[0];
      }
      else {
        this.history.unshift(arguments[0]);
        this.history = this.history.slice(0, 100);
      }

      // Trigger a before:navigate event.
      args.unshift('before:navigate');
      this.trigger.apply(this, args);

      AutoRouter.prototype.navigate.apply(this, arguments);
    },
    back: function () {
      var route;
      if (this.history.length >= 2) {
        this.history.shift();
        route = this.history.shift();
        this.navigate.call(this, route, true);
        return true;
      }
      else {
        return false;
      }
    }
  });

  return Router;
});