// From Kitmatic.
var remote = require('remote');
var app = remote.require('app');

module.exports = {
  isWindows: function () {
    return process.platform === 'win32';
  },
  escapePath: function (str) {
    return str.replace(/ /g, '\\ ').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  },
  CommandOrCtrl: function () {
    return this.isWindows() ? 'Ctrl' : 'Command';
  },
  removeSensitiveData: function (str) {
    if (!str || str.length === 0 || typeof str !== 'string' ) {
      return str;
    }
    return str.replace(/-----BEGIN CERTIFICATE-----.*-----END CERTIFICATE-----/mg, '<redacted>')
      .replace(/-----BEGIN RSA PRIVATE KEY-----.*-----END RSA PRIVATE KEY-----/mg, '<redacted>')
      .replace(/\/Users\/[^\/]*\//mg, '/Users/<redacted>/');
  },
  windowsToLinuxPath: function(windowsAbsPath) {
    var fullPath = windowsAbsPath.replace(':', '').split(path.sep).join('/');
    if(fullPath.charAt(0) !== '/'){
      fullPath = '/' + fullPath.charAt(0).toLowerCase() + fullPath.substring(1);
    }
    return fullPath;
  },
  linuxToWindowsPath: function (linuxAbsPath) {
    return linuxAbsPath.replace('/c', 'C:').split('/').join('\\');
  },
  webPorts: ['80', '8000', '8080', '3000', '5000', '2368', '9200', '8983']
};
