define(function (require) {
  /**
   * Use listenTo/stopListening from Backbone.js with any DOM element
   *
   * Example:
   *
   *    view.listenTo(asEvents(window), "resize", handler);
   *
   *  and the listener will be remove automatically on view.remove() or
   *  view.stoplistening()
   *
   * @param {DOM Element}
   * @return {Backbone Events style object}
   * @see https://gist.github.com/epeli/5927950
   **/
  function asEvents(el) {
    // Unwrap jQuery
    if (typeof el.get === "function") el = el.get(0);

    var listeners = [];

    return {
      on: function(event, handler, context) {
        el.addEventListener(event, handler, false);
        listeners.push({
          args: [event, handler],
          context: context
        });
      },
      off: function(event, handler, context) {
        listeners = listeners.filter(function(listener) {
          if (listener.context === context) {
            el.removeEventListener.apply(el, listener.args);
            return true;
          }
        });
      }
    };
  }

  return asEvents;
});