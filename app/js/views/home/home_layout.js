define(function (require) {
  var Marionette = require('marionette')
    , RecordsListView = require('views/records/records_list_view');

  var HomeLayout = Marionette.Layout.extend({
    className: 'home clearfix',
    template: require('hbs!home/home'),

    regions: {
      records: '.records'
    },

    initialize: function () {
      this.recordsListView = new RecordsListView({
        collection: this.collection,
        loader: this.options.loader
      });
    },

    onRender: function () {
      this.records.show(this.recordsListView);
    }
  });

  return HomeLayout;
});
