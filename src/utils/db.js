import redis from 'redis'
import tunnel from 'tunnel-ssh'
import _ from 'underscore'

const DST_PORT = 6379
const LOCAL_PORT = 8379
const DEFAULT_COUNT = 250

// Abstraction around redis.
class DB {

  // Clean up open connections, then initiate a new host connection.
  connect (host, cb) {
    if (this.client) {
      this.client.end()
    }
    if (this.tunnel) {
      this.tunnel.close((err) => {
        if (err && err.message !== 'Not running') return cb(err)
        this.connectToHost(host, cb)
      })
    } else {
      this.connectToHost(host, cb)
    }
  }

  // Connect to localhost or remote.
  connectToHost (host, cb) {
    if (host.Host === 'localhost') {
      setImmediate(() => {
        this.client = redis.createClient()
        this.client.on('ready', () => {
          cb()
        })
      })
    } else {
      this.connectToRemoteHost(host, cb)
    }
  }

  // Connect to a remote host using privateKey auth via ssh-agent.
  connectToRemoteHost (host, cb) {
    let config = {
      host: host.Hostname,
      dstPort: DST_PORT,
      localPort: LOCAL_PORT,
      username: host.User,
      agent: process.env.SSH_AUTH_SOCK
    }
    this.tunnel = tunnel(config, (err) => {
      if (err) return cb(err)
      this.client = redis.createClient(config.localPort)
      this.client.on('ready', () => {
        cb()
      })
    })
  }

  // An iterator-like api to scan keys.
  scan (options = {}) {
    let db = this

    options.cmd = 'SCAN'
    options.count = options.count || DEFAULT_COUNT

    let _scan = {
      options: options,
      cursor: 0,
      stopped: false,
      results: [],
      next: (cb) => {
        let args = []
        if (_scan.stopped) return
        if (_scan.cursor !== false) {
          args.push(_scan.cursor)
          if (options.key) {
            args.push(options.key)
          }
          if (options.count) {
            args.push('COUNT')
            args.push(options.count)
          }
          if (options.match) {
            args.push('MATCH')
            args.push(options.match)
          }
          args.push(_scan.process.bind(db, cb))
          db.client[options.cmd].apply(db.client, args)
        } else {
          if (cb) cb(null, false)
        }
      },
      process: (cb, err, results) => {
        if (err) return cb(err)
        if (_scan.stopped) return
        let [cursor, keys] = results
        _scan.cursor = (cursor === 0) ? false : cursor
        _scan.results = _scan.results.concat(keys.map(key => {
          return {key}
        }))
        if ((_scan.results.length >= options.count) || (_scan.cursor === false)) {
          ((results) => {
            _scan.results = []
            _scan.postProcess(cb, results)
          })(_scan.results)
        } else {
          _scan.next(cb)
        }
      },
      postProcess: (cb, results) => {
        if (_scan.stopped) return
        if (!results.length || !_scan.options.loadTypes) {
          return cb(null, results)
        }
        db.client.multi(results.map((result) => {
          return ['TYPE', result.key]
        })).exec((err, types) => {
          if (err) return cb(err)
          types.forEach((type, i) => {
            results[i].type = type
          })
          cb(null, results)
        })
      },
      stop: () => {
        _scan.stopped = true
      }
    }
    return _scan
  }

  // Load values for a set of keys ({key, type}).
  fetchValues (keys, cb) {
    // Collect keys by type.
    let types = keys.reduce((memo, key) => {
      memo[key.type] = memo[key.type] || []
      memo[key.type].push(key.key)
      return memo
    }, {})

    // Create tasks.
    let tasks = _.map(types, (keys, type) => {
      switch (type) {
        case 'string':
          return this.fetchStringValues(keys)
        case 'list':
          return this.fetchListValues(keys)
        case 'set':
          return this.fetchSetValues(keys)
        case 'zset':
          return this.fetchSortedSetValues(keys)
        case 'hash':
          return this.fetchHashValues(keys)
        default:
          return Promise.reject(new Error('Unknown type: ' + type))
      }
    })

    Promise.all(tasks).then((values) => {
      cb(null, Object.assign.apply(null, values))
    }, (err) => {
      cb(err)
    })
  }

  // Fetch string values for an array of keys.
  fetchStringValues (keys) {
    return Promise.resolve(keys.reduce((memo, key) => {
      memo[key] = 'value'
      return memo
    }, {}))
  }

  // Fetch list values for an array of keys.
  fetchListValues (keys) {
    return Promise.resolve(keys.reduce((memo, key) => {
      memo[key] = 'value'
      return memo
    }, {}))
  }

  // Fetch set values for an array of keys.
  fetchSetValues (keys) {
    return Promise.resolve(keys.reduce((memo, key) => {
      memo[key] = 'value'
      return memo
    }, {}))
  }

  // Fetch sorted-set values for an array of keys.
  fetchSortedSetValues (keys) {
    return Promise.resolve(keys.reduce((memo, key) => {
      memo[key] = 'value'
      return memo
    }, {}))
  }

  // Fetch hash values for an array of keys.
  fetchHashValues (keys) {
    return Promise.resolve(keys.reduce((memo, key) => {
      memo[key] = 'value'
      return memo
    }, {}))
  }
}

export default (new DB())
