import redis from 'redis';

// Abstraction around redis.
class DB {

  constructor () {
    this.client = redis.createClient();
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