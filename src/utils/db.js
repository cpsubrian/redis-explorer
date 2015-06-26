import redis from 'redis';
import remote from 'remote';
import fs from 'fs';
import path from 'path';
import tunnel from 'tunnel-ssh';
import settings from '../utils/settings';

const DST_PORT = 6379;
const LOCAL_PORT = 8379;
const DEFAULT_COUNT = 250;

// Abstraction around redis.
class DB {

  // Clean up open connections, then initiate a new host connection.
  connect (host, cb) {
    if (this.client) {
      this.client.end();
    }
    if (this.tunnel) {
      this.tunnel.close((err) => {
        if (err && err.message !== 'Not running') return cb(err);
        this.connectToHost(host, cb);
      });
    }
    else {
      this.connectToHost(host, cb);
    }
  }

  // Connect to localhost or remote.
  connectToHost (host, cb) {
    if (host.Host === 'localhost') {
      setImmediate(() => {
        this.client = redis.createClient();
        this.client.on('ready', () => {
          cb();
        });
      });
    }
    else {
      this.connectToRemoteHost(host, cb);
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
    };
    this.tunnel = tunnel(config, (err) => {
      if (err) return cb(err);
      this.client = redis.createClient(config.localPort);
      this.client.on('ready', () => {
        cb();
      });
    });
  }

  // An iterator-like api to scan keys.
  scan (options = {}) {
    options.cmd = 'SCAN';
    options.count = options.count || DEFAULT_COUNT;

    let _scan = {
      options: options,
      cursor: 0,
      stopped: false,
      keys: [],
      next: (cb) => {
        let args = []
        if (_scan.stopped) return;
        if (_scan.cursor !== false) {
          args.push(_scan.cursor);
          if (options.key) {
            args.push(options.key);
          }
          if (options.count) {
            args.push('COUNT');
            args.push(options.count);
          }
          if (options.match) {
            args.push('MATCH');
            args.push(options.match);
          }
          args.push(_scan.process.bind(this, cb));
          this.client[options.cmd].apply(this.client, args);
        }
        else {
          if (cb) cb(null, false);
        }
      },
      process: (cb, err, results) => {
        if (err) return cb(err);
        if (_scan.stopped) return;
        let [cursor, keys] = results;
        _scan.cursor = (cursor == 0) ? false : cursor;
        _scan.keys = _scan.keys.concat(keys);
        if ((_scan.keys.length >= options.count) || (_scan.cursor === false)) {
          ((keys) => {
            _scan.keys = [];
            cb(null, keys);
          })(_scan.keys);
        }
        else {
          _scan.next(cb);
        }
      },
      stop: () => {
        _scan.stopped = true;
      }
    };
    return _scan;
  }
}

export default (new DB());
