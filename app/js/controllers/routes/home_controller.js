define(function (require) {

  var app = require('app')
    , Marionette = require('marionette')
    , HomeLayout = require('views/home/home_layout')
    , RecordsCollection = require('collections/records_collection')
    , ScanLoader = require('controllers/loaders/scan_loader');

  var HomeController = Marionette.Controller.extend({

    index: function () {
      var recordsCollection = new RecordsCollection();
      app.main.show(new HomeLayout({
        collection: recordsCollection,
        loader: new ScanLoader({
          collection: recordsCollection
        })
      }));
    }

  });

  return new HomeController();
});