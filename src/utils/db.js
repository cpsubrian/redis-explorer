import redis from 'redis';

// Abstraction around redis.
class DB {

  constructor () {
    this.client = redis.createClient();
  }

  scan (options = {}) {
    options.count = options.count || 500;

    let _scan = {
      cursor: 0,
      next: (cb) => {
        let args = []
        if (_scan.cursor !== false) {
          args.push(_scan.cursor);
          if (options.key) {
            args.push(options.key);
          }
          if (options.count) {
            args.push('count');
            args.push(options.count);
          }
          if (options.match) {
            args.push('match');
            args.push(options.match);
          }
          args.push(_scan.process.bind(this, cb));
          this.client.scan.apply(this.client, args);
        }
        else {
          if (cb) cb(null, false);
        }
      },
      process: (cb, err, results) => {
        if (err) return cb(err);
        let [cursor, keys] = results;
        _scan.cursor = (cursor == 0) ? false : cursor;
        cb(null, keys);
      }
    };
    return _scan;
  }

}

export default (new DB());