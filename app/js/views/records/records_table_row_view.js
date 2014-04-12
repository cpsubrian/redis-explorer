define(function (require) {

  var app = require('app')
    , Marionette = require('marionette')
    , bootstrap = require('bootstrap')
    , RecordDetailView = require('views/records/record_detail_view');

  var RecordsTableRowView = Marionette.ItemView.extend({
    tagName: 'tr',
    template: require('hbs!records/records_table_row'),

    events: {
      'click': 'onClick'
    },

    templateHelpers: function () {
      var data = {};

      // Type icon.
      switch (this.model.get('type')) {
        case 'string':
          data.icon = 'fa-key';
          break;

        case 'list':
          data.icon = 'fa-list-alt';
          break;

        case 'set':
          data.icon = 'fa-list-ul';
          break;

        case 'zset':
          data.icon = 'fa-list-ol';
          break;

        case 'hash':
          data.icon = 'fa-suitcase';
          break;

        default:
          data.icon = 'fa-key';
          break;
      }

      // Key
      data.key = this.model.id.split(':').join('<span class="sep">:</span>');

      return data;
    },

    onClick: function (e) {
      e.preventDefault();
      app.slideout.show(new RecordDetailView({
        model: this.model
      }));
      this.$el.addClass('selected');
      this.$el.siblings('tr').removeClass('selected');
    }
  });

  return RecordsTableRowView;
});