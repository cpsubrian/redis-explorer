define(function (require) {
  var Marionette = require('marionette')
    , app = require('app')
    , ErrorView = require('views/misc/error_view')
    , Model = require('models/model');

  var ErrorController = Marionette.Controller.extend({

    error403: function () {
      app.main.show(new ErrorView({
        model: new Model({code: 403, message: 'Forbidden'})
      }));
    },

    error404: function () {
      app.main.show(new ErrorView({
        model: new Model({code: 404, message: 'Page Not Found'})
      }));
    },

    serverError: function (err) {
      var errModel;

      if (err.code && err.message) {
        errModel = new Model({code: err.code, message: err.message});
      }
      else if (err.code && this['error' + err.code]) {
        this['error' + err.code]();
      }
      else {
        errModel = new Model({code: 500, message: 'System Error'});
      }

      if (errModel) {
        app.main.show(new ErrorView({
          model: errModel
        }));
      }
    }

  });

  return new ErrorController();
});