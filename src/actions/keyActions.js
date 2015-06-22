import alt from '../alt';
import db from '../utils/db';

class KeyActions {

  fetchKeys () {
    this.dispatch();

    let size = 1000
      , scan = db.client.scan('*', size)
      , batch = [];

    scan.on('error', (err) => {
      this.actions.fetchKeysFailed(err);
    });
    scan.on('data', (key) => {
      batch.push(key);
      if (batch.length === size) {
        this.actions.fetchKeysAdd(batch);
        batch = [];
      }
    });
    scan.on('end', () => {
      if (batch.length > 0) {
        this.actions.fetchKeysAdd(batch);
        batch = [];
      }
      this.actions.fetchKeysFinished();
    });
  }

  fetchKeysFailed (err) {
    this.dispatch(err);
  }

  fetchKeysFinished () {
    this.dispatch();
  }

  fetchKeysAdd (keys) {
    this.dispatch(keys);
  }

}

export default alt.createActions(KeyActions);