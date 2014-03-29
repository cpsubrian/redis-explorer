define(function (require) {
  var Backbone = require('backbone')
    , extend = require('lib/extend');

  // Add mixin functionality to a Backbone-style class.
  function mixinify (Class) {
    // Merge reults together or set them.
    function mergeOrSet (target, toMerge) {
      if (target === null) return toMerge;
      if (_(target).isObject()) {
        if (_(target).isArray()) {
          return target.concat(toMerge);
        }
        else if (_(target).isFunction()) {
          return toMerge;
        }
        else {
          return extend(target, toMerge);
        }
      }
      else {
        return toMerge;
      }
    }

    // Return a function that calls a stack of mixin methods followed by
    // the original.
    Class.prototype._mixinMethod = function (name) {
      return (function () {
        var args = arguments, self = this, temp = null, result = null;
        if (this._mixinMethods.hasOwnProperty([name])) {
          _(this._mixinMethods[name]).forEach(function (method) {
            temp = method.apply(self, args);
            result = mergeOrSet(result, temp);
          });
        }
        if (this._origMethods[name]) {
          temp = this._origMethods[name].apply(this, args);
          result = mergeOrSet(result, temp);
        }
        return result;
      }).bind(this);
    };

    // Override the constructor to setup mixins.
    var _constructor = Class.prototype.constructor;
    Class.prototype.constructor = function () {
      var self = this;

      // Subclasses would provide an array of mixins.
      this.mixins = this.mixins || [];

      // We'll store method stacks here.
      this._origMethods = {};
      this._mixinMethods = {};

      // Apply mixins.
      _(this.mixins).forEach(function (Mixin) {
        // Loop over mixin properties and:
        //   - Add primitives if they are not already set.
        //   - Merge objects.
        //   - Concatenate arrays.
        //   - Add methods to stack.
        _(Mixin).chain().keys().forEach(function (key) {
          if (_(Mixin[key]).isObject()) {
            if (_(Mixin[key]).isArray()) {
              self[key] = self[key].concat(Mixin[key]);
            }
            else if (_(Mixin[key]).isFunction()) {
              if (!self[key] || _(self[key]).isFunction()) {
                if (self[key]) {
                  self._origMethods[key] = self[key];
                }
                self._mixinMethods[key] = self._mixinMethods[key] || [];
                self._mixinMethods[key].push(Mixin[key]);
              }
            }
            else {
              if (self[key]) {
                self[key] = extend(Mixin[key], self[key]);
              }
              else {
                self[key] = Mixin[key];
              }
            }
          }
          else {
            self[key] = self[key] || Mixin[key];
          }
        });
      });

      // Replace mixed-in methods.
      _(this._mixinMethods).chain().keys().forEach(function (key) {
        self[key] = self._mixinMethod(key);
      });

      // Call original constructor.
      _constructor.apply(this, arguments);
    };
  }

  // Apply to base classes.
  mixinify(Backbone.View);
  mixinify(Backbone.Model);
  mixinify(Backbone.Collection);
});