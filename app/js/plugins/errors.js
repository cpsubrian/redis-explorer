define(function (require) {
  var app = require('app')
    , errorController = require('controllers/routes/error_controller');

  app.on('error', function (err) {
    errorController.serverError(err);
  });
});