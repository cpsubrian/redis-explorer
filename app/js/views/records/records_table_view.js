define(function (require) {

  var app = require('app')
    , async = require('async')
    , Marionette = require('marionette')
    , RecordsTableRowView = require('views/records/records_table_row_view');

  var RecordsTableView = Marionette.CompositeView.extend({
    template: require('hbs!records/records_table'),
    className: 'records-table',
    itemView: RecordsTableRowView,
    itemViewContainer: 'tbody'
  });

  return RecordsTableView;
});