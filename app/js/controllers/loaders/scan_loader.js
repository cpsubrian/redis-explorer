define(function (require) {
  var app = require('app')
    , _ = require('underscore')
    , Marionette = require('marionette');

  var ScanLoader = Marionette.Controller.extend({

    initialize: function (options) {
      this.collection = options.collection;
      this.cursor = 0;
      this.onLoaded = this.onLoaded.bind(this);
    },

    load: function () {
      if (this.cursor !== false) {
        if (this.options.count && this.options.match) {
          app.redis.scan(this.cursor, 'match', this.options.match, 'count', this.options.count, this.onLoaded);
        }
        else if (this.options.count) {
          app.redis.scan(this.cursor, 'count', this.options.count, this.onLoaded);
        }
        else if (this.options.match) {
          app.redis.scan(this.cursor, 'match', this.options.match, this.onLoaded);
        }
        else {
          app.redis.scan(this.cursor, this.onLoaded);
        }
        return true;
      }
      else {
        return false;
      }
    },

    onLoaded: function (err, results) {
      if (err) return this.triggerMethod('onLoadError', err);
      this.cursor = results[0];
      if (this.cursor === 0) this.cursor = false;
      this.collection.add(results[1].map(function (key) {
        return {id: key};
      }));
    },

    reset: function () {
      this.cursor = 0;
    }

  });

  return ScanLoader;
});