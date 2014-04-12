define(function (require) {

  var app = require('app')
    , async = require('async')
    , Marionette = require('marionette')
    , RecordsTableRowView = require('views/records/records_table_row_view');

  var RecordsTableView = Marionette.CompositeView.extend({
    template: require('hbs!records/records_table'),
    className: 'records-table',
    itemView: RecordsTableRowView,
    itemViewContainer: 'tbody',

    initialize: function () {
      app.slideout.on('close', this.onSlideoutClose.bind(this));

      // Bind keydown on document.
      this.onKeydown = this.onKeydown.bind(this);
      $(document).on('keydown', this.onKeydown);
    },

    onClose: function () {
      $(document).off('keydown', this.onKeydown);
    },

    onSlideoutClose: function () {
      this.$el.find('.selected').removeClass('selected');
    },

    onKeydown: function (e) {
      if (e.keyCode === 27 || e.keyCode === 38 || e.keyCode === 40) {
        e.preventDefault();

        // Esc
        if (e.keyCode === 27) {
          app.slideout.close();
        }

        // Up
        if (e.keyCode === 38) {
          this.$el.find('.selected').prev('tr').click();
        }

        // Down
        if (e.keyCode === 40) {
          this.$el.find('.selected').next('tr').click();
        }
      }
    }
  });

  return RecordsTableView;
});