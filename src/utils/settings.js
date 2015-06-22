import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import conf from '../conf';

let basePath = path.join(
      process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'],
      'Library',
      'Application\ Support',
      conf['APPNAME']
    )
  , settingsPath = path.join(basePath, 'settings.json');

// Create basePath if it doesn't exist.
mkdirp.sync(basePath);

// Load settings from the file.
let cache = {};
try {
  cache = JSON.parse(fs.readFileSync(settingsPath));
}
catch (e) {};

// Settings API.
const settings = {

  get (key, fallback) {
    return cache[key] || fallback;
  },

  set (key, value) {
    cache[key] = value;
    fs.writeFileSync(settingsPath, JSON.stringify(cache));
  }

};

export default settings;
