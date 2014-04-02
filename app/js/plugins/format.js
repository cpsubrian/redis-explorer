define(function (require) {

  var app = require('app');
  app.format = {};

  app.format.plural = function (num, singular, plural) {
    if (num === 1) {
      return num + ' ' + singular;
    }
    else {
      return num + ' ' + plural;
    }
  };
});