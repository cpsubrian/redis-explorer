define(function (require) {

  var app = require('app')
    , async = require('async')
    , Marionette = require('marionette')
    , RecordsTableRowView = require('views/records/records_table_row_view')
    , InfiniteScroll = require('views/mixins/infinite_scroll');

  var RecordsTableView = Marionette.CompositeView.extend({
    template: require('hbs!records/records_table'),
    className: 'records-table',
    itemView: RecordsTableRowView,
    itemViewContainer: 'tbody',
    mixins: [InfiniteScroll],
    infiniteScroll: {
      container: app.main
    }
  });

  return RecordsTableView;
});