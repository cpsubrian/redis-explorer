define(function (require) {
  var Marionette = require('marionette')
    , RecordsTableView = require('views/records/records_table_view');

  var HomeLayout = Marionette.Layout.extend({
    className: 'home clearfix',
    template: require('hbs!home/home'),

    regions: {
      records: '.records'
    },

    initialize: function () {
      this.recordsTableView = new RecordsTableView({
        collection: this.collection
      });
      this.options.loader.load();
    },

    onRender: function () {
      this.records.show(this.recordsTableView);
    }
  });

  return HomeLayout;
});
