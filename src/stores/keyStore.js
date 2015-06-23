import alt from '../alt';
import keyActions from '../actions/keyActions';

class KeyStore {

  constructor () {
    // Bind actions.
    this.bindActions(keyActions);

    // Initialize state.
    this.keys = [];
    this.loading = false;
    this.loaded = false;
    this.error = null;
    this.offset = 0;
  }

  onFetchKeys () {
    this.error = null;
    this.loading = true;
    this.loaded = false;
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
    this.loaded = true;
  }

  onSetOffset (offset) {
    this.offset = offset;
  }

}

export default alt.createStore(KeyStore);
