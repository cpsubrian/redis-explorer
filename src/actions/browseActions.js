import alt from '../alt'
import db from '../utils/db'

// 'Global' scan object.
let _scan

// Browse Actions.
class BrowseActions {

  /* General
   ****************************************************************************/
  resetKeys () {
    this.dispatch()
  }

  setOffset (offset) {
    this.dispatch(offset)
  }

  setMatch (match) {
    this.dispatch(match)
  }

  toggleSelectedKey (key) {
    this.dispatch(key)
  }

  /* Fetch Keys Lifecycle
   ****************************************************************************/
  fetchKeys (options = {}) {
    this.dispatch()

    // Stop an active scan.
    if (_scan) _scan.stop()

    // Create the scan.
    options.loadTypes = true
    _scan = db.scan(options)

    // Start the scan.
    this.actions.fetchKeysNext()
  }

  fetchKeysNext () {
    this.dispatch()

    _scan.next((err, keys) => {
      if (err) {
        this.actions.fetchKeysFailed(err)
      } else if (keys) {
        this.actions.fetchKeysAdd(keys)
      } else {
        this.actions.fetchKeysFinished()
      }
    })
  }

  fetchKeysAdd (keys) {
    this.dispatch(keys)
    this.actions.fetchValues(keys)
  }

  fetchKeysFailed (err) {
    this.dispatch(err)
  }

  fetchKeysFinished () {
    this.dispatch()
  }

  /* Fetch Values Lifecycle
   ****************************************************************************/
  fetchValues (keys) {
    this.dispatch(keys)

    // Start loading the values.
    db.fetchValues(keys, (err, values) => {
      if (err) {
        this.actions.fetchValuesFailed(err)
      } else {
        this.actions.fetchValuesAdd(values)
      }
    })
  }

  fetchValuesAdd (values) {
    this.dispatch(values)
  }

  fetchValuesFailed (err) {
    this.dispatch(err)
  }
}

export default alt.createActions(BrowseActions)
