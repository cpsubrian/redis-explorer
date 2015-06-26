import alt from '../alt'
import regex from '../utils/regex'
import browseActions from '../actions/browseActions'

class BrowseStore {

  constructor () {
    // Bind actions.
    this.bindActions(browseActions)

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

  /* General
   ****************************************************************************/
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

  /* Fetch Keys Lifecycle
   ****************************************************************************/
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

  onFetchKeysAdd (keys) {
    this.loading = false
    this.loaded = true
    this.keys = this.keys.concat(keys)
  }

  onFetchKeysFailed (err) {
    this.loading = false
    this.loaded = true
    this.error = err
  }

  onFetchKeysFinished () {
    this.loading = false
    this.loaded = true
    this.finished = true
  }

  /* Fetch Keys Lifecycle
   ****************************************************************************/
  onFetchValues (keys) {

  }

  onFetchValuesAdd (values) {

  }

  onFetchValuesFailed (err) {
    this.error = err
  }
}

export default alt.createStore(BrowseStore)
