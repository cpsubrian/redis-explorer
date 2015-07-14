var conf = {}

conf.BASENAME = 'RedisExplorer'
conf.APPNAME = conf.BASENAME
conf.DEVELPER_ID = 'Brian Link'
conf.COMPANY = 'Terra Eclipse, Inc.'
conf.ICON = 'resources/redisexplorer'
conf.ICON_URL = 'https://raw.githubusercontent.com/cpsubrian/redisexplorer/master/' + conf.ICON + '.ico'
conf.BUNDLE_ID = 'com.terraeclipse.redisexplorer'
conf.OSX_OUT = './dist/' + conf.APPNAME + '-darwin-x64'
conf.OSX_FILENAME = conf.OSX_OUT + '/' + conf.APPNAME + '.app'

module.exports = conf
