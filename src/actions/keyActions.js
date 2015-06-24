import alt from '../alt';
import db from '../utils/db';

class KeyActions {

  fetchKeys () {
    this.dispatch();

    // Do the scan.
    let getKeys = (scan) => {
      scan.next((err, keys) => {
        if (err) {
          this.actions.fetchKeysFailed(err);
        }
        else if (keys) {
          this.actions.fetchKeysAdd(keys);
          getKeys(scan);
        }
        else {
          this.actions.fetchKeysFinished();
        }
      });
    };

    getKeys(db.scan());
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

  setOffset (offset) {
    this.dispatch(offset);
  }

}

export default alt.createActions(KeyActions);