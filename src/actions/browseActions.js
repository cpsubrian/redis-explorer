import alt from '../alt'
import db from '../utils/db'
import valuesActions from '../actions/valuesActions'

// 'Global' scan object.
let _scan

// Browse Actions.
class BrowseActions {

  resetKeys () {
    this.dispatch()
  }

  fetchKeys (options = {}) {
    this.dispatch()

    // Stop an active scan.
    if (_scan) _scan.stop()

    // Create the scan.
    _scan = db.scan(options)

    // Start the scan.
    this.actions.fetchKeysNext()
  }

  fetchKeysFailed (err) {
    this.dispatch(err)
  }

  fetchKeysFinished () {
    this.dispatch()
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

    // Trigger values fetch if asked for.
    if (_scan.options.getValues) {
      valuesActions.fetchValues(keys)
    }
  }

  setOffset (offset) {
    this.dispatch(offset)
  }

  setMatch (match) {
    this.dispatch(match)
  }

}

export default alt.createActions(BrowseActions)
