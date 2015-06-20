var app = require('app')
  , settings = require('./settings')
  , BrowserWindow = require('browser-window')
  , os = require('os');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Get size from os.
var size = {};
try {
  size = JSON.parse(fs.readFileSync(path.join(process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'], 'Library', 'Application\ Support', settings['APPNAME'], 'size')));
} catch (err) {}

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    'width': size.width || 800,
    'height': size.height || 600,
    'min-width': os.platform() === 'win32' ? 400 : 700,
    'min-height': os.platform() === 'win32' ? 260 : 500,
    'standard-window': false,
    'resizable': true,
    'show': false,
    //'frame': false,
  });

  // Load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Show window after the url is loaded.
  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.setTitle(settings['BASENAME']);
    mainWindow.show();
    mainWindow.focus();
  });

  // Don't allow navigation to weird endpoints.
  mainWindow.webContents.on('will-navigate', function (e, url) {
    if (url.indexOf('build/index.html#') < 0) {
      e.preventDefault();
    }
  });

  // Handle window close depending on platform.
  app.on('window-all-closed', function() {
    app.quit();
  });

});