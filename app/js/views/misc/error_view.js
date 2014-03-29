define(function (require) {
  var Marionette = require('marionette');

  var ErrorView = Marionette.ItemView.extend({
    className: 'error',
    template: require('hbs!misc/error')
  });

  return ErrorView;
});