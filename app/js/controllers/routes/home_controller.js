define(function (require) {

  var app = require('app')
    , Marionette = require('marionette')
    , HomeLayout = require('views/home/home_layout')
    , SidebarLayout = require('views/sidebar/sidebar_layout')
    , RecordsCollection = require('collections/records_collection')
    , ScanLoader = require('controllers/loaders/scan_loader');

  var HomeController = Marionette.Controller.extend({

    index: function () {
      var recordsCollection = new RecordsCollection();
      app.main.show(new HomeLayout({
        collection: recordsCollection,
        loader: new ScanLoader({
          collection: recordsCollection,
          count: 50,
          fetch: true
        })
      }));
      app.left.show(new SidebarLayout());
    }

  });

  return new HomeController();
});