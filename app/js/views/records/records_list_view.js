define(function (require) {

  var app = require('app')
    , Marionette = require('marionette')
    , RecordsListItemView = require('views/records/records_list_item_view')
    , InfiniteScroll = require('views/mixins/infinite_scroll');

  var RecordsListView = Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'records-list',
    itemView: RecordsListItemView,
    mixins: [InfiniteScroll],
    infiniteScroll: {
      container: app.main
    },

    onRender: function () {
      this.options.loader.load();
    }
  });

  return RecordsListView;
});