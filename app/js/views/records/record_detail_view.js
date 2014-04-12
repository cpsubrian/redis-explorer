define(function (require) {

  var app = require('app')
    , Marionette = require('marionette')
    , Prism = require('prismjs');

  var RecordDetailView = Marionette.ItemView.extend({
    className: 'record-detail',
    template: require('hbs!records/record_detail'),

    events: {
      'click .close': 'onClickClose'
    },

    initialize: function () {
      var self = this;
      self.loaded = true;
    },

    onRender: function () {
      this.$el.find('code').each(function () {
        Prism.highlightElement(this);
      });
    },

    templateHelpers: function () {
      var data = {};

      // Loaded.
      data.loaded = this.loaded || false;

      // Key
      data.key = this.model.id.split(':').join('<span class="sep">:</span> ');

      // Per type helpers.
      switch (this.model.get('type')) {
        case 'string':
          try {
            var value = JSON.parse(this.model.get('value'));
            data.json = true;
            data.value = JSON.stringify(value, null, 2);
          }
          catch (e) {}
          break;
      }

      return data;
    },

    onClickClose: function (e) {
      e.preventDefault();
      app.slideout.close();
    }
  });

  return RecordDetailView;
});