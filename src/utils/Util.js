/**
 * Some utils ported from Kitmatic.
 */

import path from 'path'

const utils = {

  isWindows () {
    return process.platform === 'win32'
  },

  escapePath (str) {
    return str.replace(/ /g, '\\ ').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
  },

  CommandOrCtrl () {
    return this.isWindows() ? 'Ctrl' : 'Command'
  },

  removeSensitiveData (str) {
    if (!str || str.length === 0 || typeof str !== 'string') {
      return str
    }
    return str.replace(/-----BEGIN CERTIFICATE-----.*-----END CERTIFICATE-----/mg, '<redacted>')
      .replace(/-----BEGIN RSA PRIVATE KEY-----.*-----END RSA PRIVATE KEY-----/mg, '<redacted>')
      .replace(/\/Users\/[^\/]*\//mg, '/Users/<redacted>/')
  },

  windowsToLinuxPath (windowsAbsPath) {
    let fullPath = windowsAbsPath.replace(':', '').split(path.sep).join('/')
    if (fullPath.charAt(0) !== '/') {
      fullPath = '/' + fullPath.charAt(0).toLowerCase() + fullPath.substring(1)
    }
    return fullPath
  },

  linuxToWindowsPath (linuxAbsPath) {
    return linuxAbsPath.replace('/c', 'C:').split('/').join('\\')
  },

  webPorts: ['80', '8000', '8080', '3000', '5000', '2368', '9200', '8983']
}

export default utils
