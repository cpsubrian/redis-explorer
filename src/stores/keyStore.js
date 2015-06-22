import alt from '../alt';
import keyActions from '../actions/keyActions';

class KeyStore {

  constructor () {
    // Bind actions.
    this.bindActions(keyActions);

    // Initialize state.
    this.keys = [];
    this.loading = false;
    this.error = null;
  }

  onFetchKeys () {
    this.error = null;
    this.loading = true;
    this.keys = [];
  }

  onFetchKeysFailed (err) {
    this.error = err;
    this.loading = false;
  }

  onFetchKeysAdd (keys) {
    this.keys = this.keys.concat(keys);
  }

  onFetchKeysFinished () {
    this.loading = false;
  }

}

export default alt.createStore(KeyStore);
