import redis from 'redis';
import scanStreams from 'redis-scanstreams';

// Attach scan commands.
scanStreams(redis);

// Abstraction around redis.
class DB {

  constructor () {
    this.client = redis.createClient();
  }

}

export default (new DB());