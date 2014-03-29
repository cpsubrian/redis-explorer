define(function (require) {
  var Handlebars = require('handlebars');

  Handlebars.registerHelper('is', function (variable, value, options) {
    if (variable == value) {
      return options.fn(this);
    }
    else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('isnt', function (variable, value, options) {
    if (variable != value) {
      return options.fn(this);
    }
    else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('in', function (variable, value, options) {
    if (!Array.isArray(variable)) return options.inverse(this);
    if (variable.indexOf(value) >= 0) {
      return options.fn(this);
    }
    else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('or', function () {
    var args = Array.prototype.slice.call(arguments, 0);
    var options = args.pop();
    for (i = 0; i < args.length; i++) {
      if (args[i]) return options.fn(this);
    }
    return options.inverse(this);
  });

  Handlebars.registerHelper('and', function () {
    var args = Array.prototype.slice.call(arguments, 0);
    var options = args.pop();
    for (i = 0; i < args.length; i++) {
      if (!args[i]) return options.inverse(this);
    }
    return options.fn(this);
  });

  Handlebars.registerHelper('loop', function (start, end, options) {
    var content = '';
    for (var i = start; i <= end; i++) {
      content += options.fn(i);
    }
    return content;
  });

  Handlebars.registerHelper('index', function (arr, i, options) {
    return options.fn(arr[i]);
  });

});