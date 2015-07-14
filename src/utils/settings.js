import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import conf from '../conf'
import throttle from '../utils/throttle'

let basePath = path.join(
      process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'],
      'Library',
      'Application\ Support',
      conf['APPNAME']
    )
let settingsPath = path.join(basePath, 'settings.json')

// Create basePath if it doesn't exist.
mkdirp.sync(basePath)

// Load settings from the file.
let cache = {}
try {
  cache = JSON.parse(fs.readFileSync(settingsPath))
} catch (e) {}

// Settings API.
const settings = {

  get (key, fallback) {
    return cache[key] || fallback
  },

  set (key, value) {
    cache[key] = value
    settings.write()
  },

  @throttle(1000)
  write () {
    fs.writeFileSync(settingsPath, JSON.stringify(cache))
  }
}

export default settings
