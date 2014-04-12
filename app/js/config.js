// Configure the AMD module loader
requirejs.config({
  // The path where your JavaScripts are located.
  baseUrl: 'js/',
  // Specify the paths of files outside the baseUrl.
  paths: {
    // Vendor paths.
    jquery: '../vendor/jquery/dist/jquery',
    bootstrap: '../vendor/bootstrap/dist/js/bootstrap',
    underscore: '../vendor/underscore/underscore',
    backbone: '../vendor/backbone/backbone',
    handlebars: '../vendor/handlebars/handlebars',
    marionette: '../vendor/backbone.marionette/lib/backbone.marionette',
    async: '../vendor/async/lib/async',
    prismjs: '../vendor/prismjs/prism',

    // Handlebars template loader/compiler.
    text: '../vendor/requirejs-text/text',
    hbs: 'require-hbs',

    // Paths to static assets.
    templates: '../templates'
  },
  // Underscore and Backbone are not AMD-capable per default,
  // so we need to use the AMD wrapping of RequireJS
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'Bootstrap'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    marionette : {
      deps : ['backbone'],
      exports: 'Backbone.Marionette'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    underscore: {
      exports: '_'
    },
    prismjs: {
      exports: 'Prism'
    }
  }
});