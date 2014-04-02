define(function (require) {
  var app = require('app')
    , Marionette = require('marionette')
    , ScanLoader = require('controllers/loaders/scan_loader')
    , RecordsCollection = require('collections/records_collection')
    , SidebarTreeView = require('views/sidebar/sidebar_tree_view');

  var SidebarLayout = Marionette.Layout.extend({
    className: 'sidebar clearfix',
    template: require('hbs!sidebar/sidebar'),

    regions: {
      tree: '.tree'
    },

    initialize: function () {
      this.collection = new RecordsCollection();
      this.keys = {};
      this.loader = new ScanLoader({
        collection: this.collection,
        mode: 'reset',
        count: 500
      });
    },

    onRender: function () {
      var self = this;
      app.redis.dbsize(function (err, dbsize) {
        if (err) return console.error(err);
        self.load(function (err) {
          if (err) return console.error(err);
          self.tree.show(new SidebarTreeView({
            keys: self.keys,
            dbsize: dbsize,
            homeLoader: self.options.homeLoader
          }));
        });
      });
    },

    load: function (cb) {
      var self = this;
      this.loader.load(function (err, more) {
        if (err) return cb(err);
        self.groupKeys();
        if (more) return self.load(cb);
        cb();
      });
    },

    groupKeys: function () {
      var self = this;
      this.collection.each(function (model) {
        var parts = model.id.split(':');
        var keys = self.keys;
        parts.forEach(function (part) {
          keys[part] = keys[part] || {};
          keys = keys[part];
        });
      });
    }
  });

  return SidebarLayout;
});
