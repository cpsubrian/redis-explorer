define(function (require) {
  var Backbone = require('backbone')
    , Model = require('models/model');

  // Base collection for the application.
  var Collection = Backbone.Collection.extend({
    model: Model
  });

  return Collection;
});