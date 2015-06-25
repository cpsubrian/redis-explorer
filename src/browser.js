import app from 'app';
import conf from './conf';
import settings from './utils/settings';
import BrowserWindow from 'browser-window';

// Report crashes to our server.
//require('crash-reporter').start();

// Keep a reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
let mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Get save bounds or use fallback defaults.
let bounds = settings.get('bounds', {
  x: 50,
  y: 50,
  width: 1100,
  height: 800
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    'x': bounds.x,
    'y': bounds.y,
    'width': bounds.width,
    'height': bounds.height,
    'min-width': 400,
    'min-height': 260,
    'standard-window': false,
    'resizable': true,
    'show': false
  });

  // Open dev tools. Probably should remove this when this is more production ready.
  mainWindow.openDevTools();

  // Load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Show window after the url is loaded.
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.setTitle(conf['BASENAME']);
    mainWindow.show();
    mainWindow.focus();
  });

  // Don't allow navigation to weird endpoints.
  mainWindow.webContents.on('will-navigate', (e, url) => {
    if (url.indexOf('build/index.html#') < 0) {
      e.preventDefault();
    }
  });

  // Save size and position of window.
  mainWindow.on('resize', () => {
    settings.set('bounds', mainWindow.getBounds());
  });
  mainWindow.on('move', () => {
    settings.set('bounds', mainWindow.getBounds());
  });

  // Handle window close depending on platform.
  app.on('window-all-closed', () => {
    app.quit();
  });
});
