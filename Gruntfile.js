var electron = require('electron-prebuilt')
var packagejson = require('./package.json')
var conf = require('./src/conf.js')

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)

  var BASENAME = conf['BASENAME']
  var APPNAME = BASENAME
  var DEVELPER_ID = conf['DEVELPER_ID']
  var COMPANY = conf['COMPANY']
  var ICON = conf['ICON']
  var ICON_URL = conf['ICON_URL']
  var BUNDLE_ID = conf['BUNDLE_ID']
  var OSX_OUT = conf['OSX_OUT']
  var OSX_FILENAME = OSX_OUT + '/' + APPNAME + '.app'
  var ELECTRON_VERSION = require('./node_modules/electron-prebuilt/package.json').version
  var target = grunt.option('target') || 'development'
  var env = process.env
  var certificateFile = grunt.option('certificateFile')
  var certificatePassword = grunt.option('certificatePassword')

  env.NODE_PATH = '..:' + env.NODE_PATH
  env.NODE_ENV = target

  grunt.initConfig({
    IDENTITY: 'Developer ID Application: ' + DEVELPER_ID,
    APPNAME: APPNAME,
    OSX_OUT: OSX_OUT,
    OSX_FILENAME: OSX_FILENAME,
    OSX_FILENAME_ESCAPED: OSX_FILENAME.replace(' ', '\\ ').replace('(', '\\(').replace(')', '\\)'),

    // Electron
    electron: {
      windows: {
        options: {
          name: BASENAME,
          dir: 'build/',
          out: 'dist/',
          version: ELECTRON_VERSION,
          platform: 'win32',
          arch: 'x64',
          asar: true,
          icon: ICON + '.ico'
        }
      },
      osx: {
        options: {
          name: APPNAME,
          dir: 'build/',
          out: '<%= OSX_OUT %>',
          version: ELECTRON_VERSION,
          platform: 'darwin',
          arch: 'x64',
          asar: true,
          'app-bundle-id': BUNDLE_ID
        }
      }
    },

    // Edits .exe files.
    rcedit: {
      exes: {
        files: [{
          expand: true,
          cwd: 'dist/' + BASENAME + '-win32',
          src: [BASENAME + '.exe']
        }],
        options: {
          icon: ICON + '.ico',
          'file-version': packagejson.version,
          'product-version': packagejson.version,
          'version-string': {
            'CompanyName': COMPANY,
            'ProductVersion': packagejson.version,
            'ProductName': APPNAME,
            'FileDescription': APPNAME,
            'InternalName': BASENAME + '.exe',
            'OriginalFilename': BASENAME + '.exe',
            'LegalCopyright': 'Copyright 2015 ' + COMPANY + ' All rights reserved.'
          }
        }
      }
    },

    // Windows installer options.
    'create-windows-installer': {
      appDirectory: 'dist/' + BASENAME + '-win32/',
      authors: COMPANY,
      // loadingGif: 'resources/loading.gif',
      // setupIcon: 'resources/setup.ico',
      iconUrl: ICON_URL,
      description: APPNAME,
      title: APPNAME,
      exe: BASENAME + '.exe',
      version: packagejson.version,
      signWithParams: '/f ' + certificateFile + ' /p ' + certificatePassword + ' /tr http://timestamp.comodoca.com/rfc3161'
    },

    // Copy files.
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: '.',
          src: ['package.json', 'conf.json', 'index.html'],
          dest: 'build/'
        }, {
          expand: true,
          cwd: 'images/',
          src: ['**/*'],
          dest: 'build/images/'
        }, {
          expand: true,
          cwd: 'fonts/',
          src: ['**/*'],
          dest: 'build/fonts/'
        }, {
          expand: true,
          cwd: 'node_modules/material-design-icons/iconfont/',
          src: ['MaterialIcons-Regular.woff2'],
          dest: 'build/fonts/MaterialIcons/'
        }, {
          expand: true,
          cwd: 'node_modules/',
          src: Object.keys(packagejson.dependencies).map(function (dep) { return dep + '/**/*' }),
          dest: 'build/node_modules/'
        }, {
          src: ICON + '.png',
          dest: 'build/images/logo.png'
        }]
      },
      windows: {
        files: [{
          expand: true,
          cwd: 'resources',
          src: [],
          dest: 'dist/' + BASENAME + '-win32/resources/resources/'
        }],
        options: {
          mode: true
        }
      },
      osx: {
        files: [{
          expand: true,
          cwd: 'resources',
          src: [],
          dest: '<%= OSX_FILENAME %>/Contents/Resources/resources/'
        }, {
          src: ICON + '.icns',
          dest: '<%= OSX_FILENAME %>/Contents/Resources/atom.icns'
        }],
        options: {
          mode: true
        }
      }
    },

    // Javascript (Babel)
    babel: {
      options: {
        sourceMap: 'inline',
        blacklist: 'regenerator'
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.js'],
          dest: 'build/'
        }]
      }
    },

    // Styles (LESS)
    less: {
      options: {
        sourceMapFileInline: true
      },
      dist: {
        files: {
          'build/main.css': 'styles/index.less'
        }
      }
    },

    // Rename files.
    rename: {
      installer: {
        src: 'installer/Setup.exe',
        dest: 'installer/' + BASENAME + 'Setup-' + packagejson.version + '.exe'
      }
    },

    // Shell options.
    shell: {
      electron: {
        command: electron + ' build',
        options: {
          async: true,
          execOptions: {
            env: env
          }
        }
      },
      sign: {
        options: {
          failOnError: false
        },
        command: [
          'codesign --deep -v -f -s "<%= IDENTITY %>" <%= OSX_FILENAME_ESCAPED %>/Contents/Frameworks/*',
          'codesign -v -f -s "<%= IDENTITY %>" <%= OSX_FILENAME_ESCAPED %>',
          'codesign -vvv --display <%= OSX_FILENAME_ESCAPED %>',
          'codesign -v --verify <%= OSX_FILENAME_ESCAPED %>'
        ].join(' && ')
      },
      zip: {
        command: 'ditto -c -k --sequesterRsrc --keepParent <%= OSX_FILENAME_ESCAPED %> <%= OSX_OUT %>/' + BASENAME + '-' + packagejson.version + '.zip'
      }
    },

    // Clean options
    clean: {
      release: ['build/', 'dist/', 'installer/']
    },

    // Live Reload
    watchChokidar: {
      options: {
        spawn: true
      },
      livereload: {
        options: {livereload: true},
        files: ['build/**/*']
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['newer:babel']
      },
      less: {
        files: ['styles/**/*.less'],
        tasks: ['less']
      },
      copy: {
        files: ['images/*', 'index.html', 'fonts/*'],
        tasks: ['newer:copy:dev']
      }
    }
  })

  // Define default (development) task.
  grunt.registerTask('default', ['newer:babel', 'less', 'newer:copy:dev', 'shell:electron', 'watchChokidar'])

  // Define platform-specific release task.
  if (process.platform === 'win32') {
    grunt.registerTask('release', ['clean:release', 'babel', 'less', 'copy:dev', 'electron:windows', 'copy:windows', 'rcedit:exes', 'create-windows-installer', 'rename:installer'])
  } else {
    grunt.registerTask('release', ['clean:release', 'babel', 'less', 'copy:dev', 'electron:osx', 'copy:osx', 'shell:sign', 'shell:zip'])
  }

  // Bail-out on electron command if this dies.
  process.on('SIGINT', function () {
    grunt.task.run(['shell:electron:kill'])
    process.exit(1)
  })
}
