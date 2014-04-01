define(function (require) {

  var app = require('app')
    , Marionette = require('marionette')
    , Handlebars = require('handlebars')
    , bootstrap = require('bootstrap');

  Handlebars.registerPartial('sidebar_keys', require('hbs!sidebar/sidebar_keys'));

  var SidebarTreeView = Marionette.ItemView.extend({
    template: require('hbs!sidebar/sidebar_tree'),

    ui: {
      'expand': 'a.expand'
    },

    events: {
      'click a.expand': 'onExpand'
    },

    templateHelpers: function () {
      var data = {};
      data.keys = this.keysToItems(this.options.keys);
      return data;
    },

    keysToItems: function (keys) {
      var items = [], self = this;
      Object.keys(keys).forEach(function (key) {
        var children = self.keysToItems(keys[key]);
        items.push({
          key: key,
          children: children,
          bottom: !children ? true : !children.some(function (child) {
            return !!child.children;
          })
        });
      });
      return items.length ? items : false;
    },

    onExpand: function (e) {
      var $expand = $(e.currentTarget)
        , $target = $($expand.attr('data-target'));

      if ($target.hasClass('in')) {
        $expand.removeClass('expanded');
      }
      else {
        $expand.addClass('expanded');
      }
    }
  });

  return SidebarTreeView;
});