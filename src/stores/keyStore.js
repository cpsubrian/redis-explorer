import alt from '../alt'
import regex from '../utils/regex'
import keyActions from '../actions/keyActions'

class KeyStore {

  constructor () {
    // Bind actions.
    this.bindActions(keyActions)

    // Initialize state.
    this.keys = []
    this.loading = false
    this.loaded = false
    this.finished = false
    this.error = null
    this.offset = 0
    this.match = null
    this.matchRegExp = null
  }

  onResetKeys () {
    this.keys = []
    this.loading = false
    this.loaded = false
    this.finished = false
    this.error = null
    this.offset = 0
    this.match = null
    this.matchRegExp = null
  }

  onFetchKeys () {
    this.keys = []
    this.loading = true
    this.loaded = false
    this.finished = false
    this.error = null
    this.offset = 0

    // Compute match regular expression.
    if (this.match && !this.matchRegExp) {
      this.matchRegExp = regex.fromGlob(this.match)
    }
  }

  onFetchKeysFailed (err) {
    this.loading = false
    this.loaded = true
    this.error = err
  }

  onFetchKeysAdd (keys) {
    this.loading = false
    this.loaded = true
    this.keys = this.keys.concat(keys)
  }

  onFetchKeysFinished () {
    this.loading = false
    this.loaded = true
    this.finished = true
  }

  onSetOffset (offset) {
    this.offset = offset
  }

  onSetMatch (match) {
    this.matchRegExp = null
    if (match && match.length) {
      this.match = match
    } else {
      this.match = null
    }
  }
}

export default alt.createStore(KeyStore)
