define(function (require) {
  var app = require('app')
    , async = require('async')
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
      var self = this;

      // Error handler.
      function error (err) {
        if (cb) return cb(err);
        return app.emit('error', err);
      }

      if (err) return error(err);

      // Check cursor
      this.cursor = results[0];
      if (this.cursor == 0) this.cursor = false;

      // Create models.
      var models = results[1].map(function (key) {
        return new self.collection.model({id: key});
      });

      // Fetch models, if we've been asked to.
      var tasks = [];
      if (this.options.fetch) {
        tasks = models.map(function (model) {
          return function (done) {
            model.fetch({
              error: function (err) {
                done(err);
              },
              success: function () {
                done();
              }
            });
          };
        });
      }
      async.parallel(tasks, function (err) {
        if (err) return error(err);

        // Add models to collection.
        self.collection[self.options.mode](models);

        if (cb) cb(null, self.cursor !== false);
      });
    },

    reset: function () {
      this.cursor = 0;
    }

  });

  return ScanLoader;
});