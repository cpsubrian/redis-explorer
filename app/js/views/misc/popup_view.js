define(function (require) {
  var Marionette = require('marionette')
    , app = require('app');

  var PopupView = Marionette.ItemView.extend({
    className: 'popup',
    template: require('hbs!misc/popup'),

    ui: {
      arrow: '.popup-arrow'
    },

    attachTo: function (target) {
      var containerOffset = app.respondContainer.offset()
        , targetOffset = target.offset()
        , targetWidth = target.width()
        , arrowHeight = this.ui.arrow.height()
        , popupWidth = this.$el.width()
        , popupHeight = this.$el.height()
        , containerWidth = app.respondContainer.width();

      this.$el.css({
        top: targetOffset.top - popupHeight - arrowHeight - containerOffset.top,
        left: targetOffset.left + (targetWidth / 2) - (popupWidth / 2) - containerOffset.left
      });

      // Check right edge of screen.
      if (this.$el.offset().left + popupWidth + 20 > containerWidth) {
        this.$el.css({
          left: 'auto',
          right: 20
        });
        this.ui.arrow.css({
          left: 'auto',
          right: containerWidth + containerOffset.left - targetOffset.left - 30 - (targetWidth / 2)
        });
      }

      // Check left edge of screen.
      if (this.$el.offset().left < 20) {
        this.$el.css({
          left: 20
        });
        this.ui.arrow.css({
          left: (targetOffset.left - 20) + (targetWidth / 2) - containerOffset.left
        });
      }
    }
  });

  return PopupView;
});