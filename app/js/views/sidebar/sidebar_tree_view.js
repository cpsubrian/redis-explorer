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
      'click a.expand': 'onExpand',
      'click a.key': 'onClickKey'
    },

    templateHelpers: function () {
      var data = {};
      data.keys = this.keysToItems(this.options.keys, '');
      return data;
    },

    keysToItems: function (keys, prefix) {
      var items = [], self = this;
      Object.keys(keys).forEach(function (key) {
        var children = self.keysToItems(keys[key], prefix + key + ':');
        items.push({
          key: key,
          fullKey: prefix + key,
          children: children,
          count: self.countChildren(children),
          bottom: !children ? true : !children.some(function (child) {
            return !!child.children;
          })
        });
      });
      return items.length ? items : false;
    },

    countChildren: function (children) {
      var sum = 0, self = this;
      if (children) {
        children.forEach(function (child) {
          if (child.children) {
            sum += self.countChildren(child.children);
          }
          else {
            sum += 1;
          }
        });
      }
      return sum;
    },

    onExpand: function (e) {
      var $expand = $(e.currentTarget)
        , $target = $($expand.attr('data-target'));

      e.preventDefault();

      if ($target.hasClass('in')) {
        $expand.removeClass('expanded');
      }
      else {
        $expand.addClass('expanded');
      }
    },

    onClickKey: function (e) {
      e.preventDefault();
      var key = $(e.currentTarget).attr('data-key');
      this.options.homeLoader.reset({
        match: key + ':*'
      });
      this.options.homeLoader.load();
    }
  });

  return SidebarTreeView;
});