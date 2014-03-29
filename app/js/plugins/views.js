define(function (require) {
  var Marionette = require('marionette')
    , app = require('app')
    , _constructor = Marionette.View.prototype.constructor
    , asEvents = require('lib/as_events');


  Marionette.View.prototype.constructor = function () {
    var self = this;
    _constructor.apply(this, arguments);
    this.listenTo(this, 'render', function () {
      app.vent.trigger('view:render', self);
    });
    this.listenTo(this, 'show', function () {
      app.vent.trigger('view:show', self);
    });
    this.listenTo(this, 'dom:refresh', function () {
      app.vent.trigger('view:dom:refresh', self);
    });
  };

  Marionette.View.prototype.listenToEl = function (el, evt, handler) {
    this.listenTo(asEvents(el), evt, handler);
  };
});