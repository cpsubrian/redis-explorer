define(function (require) {
  var Backbone = require('backbone');

  // Base model for the application.
  var Model = Backbone.Model.extend({

    parse: function (resp, options) {
      if (typeof resp === 'string') {
        try {
          return {value: JSON.parse(resp)};
        }
        catch (e) {
          return {value: resp};
        }
      }
      else {
        return {value: resp};
      }
    }

  });

  return Model;
});