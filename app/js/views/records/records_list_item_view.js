define(function (require) {

  var app = require('app')
    , Marionette = require('marionette');

  var RecordsListItemView = Marionette.ItemView.extend({
    tagName: 'li',
    template: require('hbs!records/record_list_item')
  });

  return RecordsListItemView;
});