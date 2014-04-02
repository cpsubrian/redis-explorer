define(function (require) {
  var Marionette = require('marionette')
    , RecordsTableView = require('views/records/records_table_view')
    , InfiniteScroll = require('views/mixins/infinite_scroll');

  var HomeLayout = Marionette.Layout.extend({
    className: 'home clearfix',
    template: require('hbs!home/home'),

    mixins: [InfiniteScroll],
    scrollTarget: $('.main'),

    regions: {
      records: '.records'
    },

    ui: {
      search: '.search input',
      searchMatch: '.search .match'
    },

    events: {
      'keyup .search input': 'onSearch'
    },

    initialize: function () {
      this.recordsTableView = new RecordsTableView({
        collection: this.collection
      });
      this.options.loader.load();
      this.options.loader.on('reset', this.onLoaderReset.bind(this));
    },

    onRender: function () {
      this.records.show(this.recordsTableView);
    },

    onInfiniteScrollMore: function () {
      var self = this;
      this.options.loader.load(function (err, more) {
        self.trigger('infinite:scroll:loaded', more);
      });
    },

    onLoaderReset: function () {
      this.resetScroll();
      this.ui.search.val(this.options.loader.options.match);
    },

    onSearch: function (e) {
      e.preventDefault();
      this.options.loader.reset({
        match: this.ui.search.val()
      });
      this.options.loader.load();
    }
  });

  return HomeLayout;
});
