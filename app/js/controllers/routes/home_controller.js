define(function (require) {

  var app = require('app')
    , Marionette = require('marionette')
    , HomeLayout = require('views/home/home_layout');

  var HomeController = Marionette.Controller.extend({

    index: function () {
      app.main.show(new HomeLayout());
    }

  });

  return new HomeController();
});