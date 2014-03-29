define(function (require) {
  var Marionette = require('marionette');

  var HomeLayout = Marionette.Layout.extend({
    className: 'home clearfix',
    template: require('hbs!home/home')
  });

  return HomeLayout;
});
