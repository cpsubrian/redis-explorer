define(function (require) {
  var app = require('app');

  require('mousewheel');
  require('perfect-scrollbar');

  app.addInitializer(function () {
    // Add scrollbar to main region.
    app.main.on('show', function () {
      var $scrollContainer = app.main.$el.parent();
      if ($scrollContainer.data('perfect-scroll')) {
        $scrollContainer.scrollTop(0);
        $scrollContainer.perfectScrollbar('update');
      }
      else {
        $scrollContainer.perfectScrollbar({
          suppressScrollX: true,
          includePadding: true
        });
        $scrollContainer.data('perfect-scroll', true);
      }
    });

    // Allow others to update main region.
    app.main.on('update', function () {
      var $scrollContainer = app.main.$el.parent();
      if ($scrollContainer.data('perfect-scroll')) {
        $scrollContainer.scrollTop(0);
        $scrollContainer.perfectScrollbar('update');
      }
    });

    // Add scrollbars to sidebar.
    app.left.on('show', function () {
      var $scrollContainer = app.left.$el.parent();
      if ($scrollContainer.data('perfect-scroll')) {
        $scrollContainer.scrollTop(0);
        $scrollContainer.perfectScrollbar('update');
      }
      else {
        $scrollContainer.perfectScrollbar({
          includePadding: true
        });
        $scrollContainer.data('perfect-scroll', true);
      }
    });

    // Allow others to update sidebar region.
    app.left.on('update', function () {
      var $scrollContainer = app.left.$el.parent();
      if ($scrollContainer.data('perfect-scroll')) {
        $scrollContainer.scrollTop(0);
        $scrollContainer.perfectScrollbar('update');
      }
    });

    // Add scrollbars to slideout.
    app.slideout.on('show', function () {
      app.slideout.$el.find('.slideout-content').perfectScrollbar({
        suppressScrollX: true,
        includePadding: true
      });
    });
    app.slideout.on('close', function () {
      app.slideout.$el.find('.slideout-content').perfectScrollbar('destroy');
    });
  });
});