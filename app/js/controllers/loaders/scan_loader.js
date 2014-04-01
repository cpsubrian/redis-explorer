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
      var args = [];
      if (this.cursor !== false) {
        this.args.push(this.cursor);

        if (this.options.key) {
          this.args.push(this.options.key);
        }

        if (this.options.count) {
          this.args.push('count');
          this.args.push(this.options.count);
        }

        if (this.options.match) {
          this.args.push('match');
          this.args.push(this.options.match);
        }

        this.args.push(this.onLoaded);
        app.redis.scan.apply(app.redis, args);

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