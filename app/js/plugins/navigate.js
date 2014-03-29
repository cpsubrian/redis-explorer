define(function (require) {
  var $ = require('jquery')
    , app = require('app')
    , Backbone = require('backbone');

  // Regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  function sanitize(href) {
    if (typeof href === 'string') {
      var root = Backbone.history.root.replace(trailingSlash, '');
      if (!href.indexOf(root)) href = href.substr(root.length);
      return href.replace(routeStripper, '');
    }
    return false;
  }

  function stripPrefix (href) {
    if (app.urlPrefix) {
      return href.replace(app.urlPrefix, '');
    }
    return href;
  }

  function isActive($link) {
    var fragment = Backbone.history.getFragment()
      , href = sanitize(stripPrefix($link.attr('href')));

    return (href === fragment) || (href && fragment.indexOf(href + '/') === 0);
  }

  app.addInitializer(function () {
    // When a 'navigation' link is clicked, route the app.
    $('body').on('click', 'a[role=navigate]', function (e) {
      e.preventDefault();
      app.router.navigate(stripPrefix($(this).attr('href')), {trigger: true});
    });

    // Respond to route changes.
    app.router.on('route', function () {
      // Scroll back to the top.
      $('html, body').animate({ scrollTop: 0 }, 'fast');

      // Add/remove active classes to links and navigations.
      $('a[role=navigate]').each(function () {
        var $link = $(this);
        if (isActive($link)) {
          $link.addClass('active');
          $link.parents('.nav-pills li').addClass('active');
        }
        else {
          $link.removeClass('active');
          $link.parents('.nav-pills li').removeClass('active');
        }
      });
    });
  });
});