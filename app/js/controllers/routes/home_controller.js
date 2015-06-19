define(function (require) {

  var app = require('app')
    , Marionette = require('marionette')
    , HomeLayout = require('views/home/home_layout')
    , SidebarLayout = require('views/sidebar/sidebar_layout')
    , RecordsCollection = require('collections/records_collection')
    , ScanLoader = require('controllers/loaders/scan_loader');

  var HomeController = Marionette.Controller.extend({

    index: function () {
      this.recordsCollection = new RecordsCollection();
      this.recordsLoader = new ScanLoader({
        collection: this.recordsCollection,
        count: 50,
        fetch: true,
        min: 50
      });

      this.homeLayout = new HomeLayout({
        collection: this.recordsCollection,
        loader: this.recordsLoader
      });

      this.sidebarLayout = new SidebarLayout({
        homeLoader: this.recordsLoader
      });

      app.main.show(this.homeLayout);
      app.left.show(this.sidebarLayout);

      this.recordsCollection.on('reset', function () {
        app.main.trigger('update');
      });
    }

  });

  return new HomeController();
});