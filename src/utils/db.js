import redis from 'redis';
import remote from 'remote';
import fs from 'fs';
import path from 'path';
import tunnel from 'tunnel-ssh';
import settings from '../utils/settings';

const DST_PORT = 6379;
const LOCAL_PORT = 8379;

// Abstraction around redis.
class DB {

  connect (host, cb) {
    if (this.client) {
      this.client.end();
      this.connectToHost(host, cb);
    }
    else {
      this.connectToHost(host, cb);
    }
  }

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
      if (this.tunnel) {
        this.tunnel.close((err) => {
          if (err) return cb(err);
          this.connectToRemoteHost(host, cb);
        });
      }
      else {
        this.connectToRemoteHost(host, cb);
      }
    }
  }

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
    this.tunnel.on('sshConnection', (sshConnection) => {
      sshConnection.on('keyboard-interactive',
        function(name, instructions, instructionsLang, prompts, finish) {
          // Pass answers to `prompts` to `finish()`. Typically `prompts.length === 1`
          // with `prompts[0] === "Password: "`
          finish(['blink33i']);
        });
    });
  }

  scan (options = {}) {
    options.cmd = 'SCAN';
    options.count = options.count || 500;

    let _scan = {
      cursor: 0,
      stopped: false,
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
        cb(null, keys);
      },
      stop: () => {
        _scan.stopped = true;
      }
    };
    return _scan;
  }

}

export default (new DB());