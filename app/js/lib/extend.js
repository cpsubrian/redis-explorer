define(function () {
  // A 2-level-deep extend.
  function extendTwoDeep (defaults, options) {
    var result = {};
    _(defaults).chain().keys().forEach(function (key) {
      result[key] = _(defaults[key]).isObject() ? _(defaults[key]).clone() : defaults[key];
    });
    _(options).chain().keys().forEach(function (key) {
      if (_(options[key]).isObject() && !_(options[key]).isArray() && !_(options[key]).isFunction()) {
        result[key] = result[key] || {};
        _(options[key]).chain().keys().forEach(function (subkey) {
          result[key][subkey] = options[key][subkey];
        });
      }
      else {
        result[key] = options[key];
      }
    });
    return result;
  }

  return extendTwoDeep;
});