define(function (require) {

  var app = require('app')
    , Marionette = require('marionette')
    , Handlebars = require('handlebars');

  Handlebars.registerPartial('sidebar_keys', require('hbs!sidebar/sidebar_keys'));

  var SidebarTreeView = Marionette.ItemView.extend({
    template: require('hbs!sidebar/sidebar_tree'),
    templateHelpers: function () {
      var data = {};
      data.keys = this.keysToItems(this.options.keys);
      return data;
    },
    keysToItems: function (keys) {
      var items = [], self = this;
      Object.keys(keys).forEach(function (key) {
        items.push({
          key: key,
          children: self.keysToItems(keys[key])
        });
      });
      return items.length ? items : false;
    }
  });

  return SidebarTreeView;
});