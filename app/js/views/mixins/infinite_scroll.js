define(function (require) {
  var app = require('app')
    , _ = require('underscore');

  var InfiniteScroll = {

    paused: false,
    finished: false,

    scrollTarget: null,
    scrollOffset: 100,
    prevScrollY: 0,

    ui: {
      loading_indicator: '.infinity-loading-indicator'
    },

    initialize: function () {
      _.bindAll(this, 'onScroll');
      this.scrollTarget || (this.scrollTarget = $(window));
      this.scrollTarget.bind('scroll', this.onScroll);
      this.$el.append($('<div class="infinity-loading-indicator hide"><span><i class="fa fa-spinner fa-spin"></i></span></div>'));
    },

    resetScroll: function () {
      this.loading = false;
      this.paused = false;
      this.finished = false;
    },

    onScroll: function (e) {
      var self = this;
      if (!this.loading && !this.paused && !this.finished) {
        var scrollY = this.scrollTarget.scrollTop() + this.scrollTarget.height()
          , docHeight = this.scrollTarget.get(0).scrollHeight;

        if (!docHeight) {
          docHeight = $(document).height();
        }

        if (scrollY >= docHeight - this.scrollOffset && this.prevScrollY <= scrollY) {
          this.ui.loading_indicator.removeClass('hide');
          this.loading = true;
          this.triggerMethod('infinite:scroll:more');
          this.listenToOnce(this, 'infinite:scroll:loaded', function (more) {
            this.loading = false;
            if (!more) {
              self.finished = true;
            }
            self.ui.loading_indicator.addClass('hide');
          });
        }

        this.prevScrollY = scrollY;
      }
    },

    onClose: function () {
      this.scrollTarget.unbind('scroll', this.onScroll);
    }
  };

  return InfiniteScroll;
});