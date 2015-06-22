import os from 'os';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import app from 'app';
import settings from './settings';
import BrowserWindow from 'browser-window';

// Report crashes to our server.
require('crash-reporter').start();

// Keep a reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
let mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Filepath to settings.
function settingPath (setting) {
  return path.join(process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'], 'Library', 'Application\ Support', settings['APPNAME'], setting);
}

// Get size from os.
let bounds = {};
try {
  mkdirp(settingPath(''));
  bounds = JSON.parse(fs.readFileSync(settingPath('bounds')));
} catch (err) {}

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    'x': bounds.x || 50,
    'y': bounds.y || 50,
    'width': bounds.width || 1100,
    'height': bounds.height || 800,
    'min-width': os.platform() === 'win32' ? 400 : 700,
    'min-height': os.platform() === 'win32' ? 260 : 500,
    'standard-window': false,
    'resizable': true,
    'show': false
  });

  // Load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Show window after the url is loaded.
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.setTitle(settings['BASENAME']);
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
    fs.writeFileSync(settingPath('bounds'), JSON.stringify(mainWindow.getBounds()));
  });
  mainWindow.on('move', () => {
    fs.writeFileSync(settingPath('bounds'), JSON.stringify(mainWindow.getBounds()));
  });

  // Handle window close depending on platform.
  app.on('window-all-closed', () => {
    app.quit();
  });
});
