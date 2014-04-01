define(function (require) {
  var app = require('app')
    , _ = require('underscore')
    , Marionette = require('marionette');

  var ScanLoader = Marionette.Controller.extend({

    initialize: function (options) {
      this.options.mode = options.mode || 'add';
      this.collection = options.collection;
      this.cursor = 0;
    },

    load: function (cb) {
      var args = [];
      if (this.cursor !== false) {
        args.push(this.cursor);
        if (this.options.key) {
          args.push(this.options.key);
        }
        if (this.options.count) {
          args.push('count');
          args.push(this.options.count);
        }
        if (this.options.match) {
          args.push('match');
          args.push(this.options.match);
        }
        args.push(this.onLoaded.bind(this, cb));
        app.redis.scan.apply(app.redis, args);
      }
      else {
        if (cb) cb(null, false);
      }
    },

    onLoaded: function (cb, err, results) {
      if (err) {
        if (cb) return cb(err);
      }
      this.cursor = results[0];
      if (this.cursor == 0) this.cursor = false;
      this.collection[this.options.mode](results[1].map(function (key) {
        return {id: key};
      }));
      if (cb) cb(null, this.cursor !== false);
    },

    reset: function () {
      this.cursor = 0;
    }

  });

  return ScanLoader;
});