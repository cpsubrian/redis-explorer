import alt from '../alt'
import _ from 'underscore'
import Immutable from 'immutable'
import immutable from 'alt/utils/ImmutableUtil'
import regex from '../utils/regex'
import browseActions from '../actions/browseActions'

@immutable
class BrowseStore {

  constructor () {
    // Bind actions.
    this.bindActions(browseActions)

    // Initialize state.
    this.keys = Immutable.OrderedMap()
    this.keysIndex = Immutable.List()
    this.selectedKey = null
    this.selectedIndex = null
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
    this.keys = this.keys.clear()
    this.keysIndex = this.keysIndex.clear()
    this.selectedKey = null
    this.selectedIndex = null
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

  onToggleSelectedKey (key) {
    if (key) {
      let index = this.keysIndex.indexOf(key)
      this.onToggleSelected({key, index})
    } else {
      this.onToggleSelected()
    }
  }

  onToggleSelectedIndex (index) {
    let key = this.keysIndex.get(index)
    this.onToggleSelected({key, index})
  }

  onToggleSelected (item = {}) {
    let {key, index} = item
    key = (typeof key !== 'undefined') ? key : this.selectedKey.get('key')
    index = (typeof index !== 'undefined') ? index : this.selectedIndex
    this.keys = this.keys.withMutations((keys) => {
      if (keys.get(key).get('selected')) {
        keys.update(key, (item) => item.set('selected', false))
        this.selectedKey = null
        this.selectedIndex = null
      } else {
        if (this.selectedKey) {
          keys.update(this.selectedKey.get('key'), (item) => item.set('selected', false))
        }
        keys.update(key, (item) => item.set('selected', true))
        this.selectedKey = keys.get(key)
        this.selectedIndex = index
      }
    })
  }

  /* Fetch Keys Lifecycle
   ****************************************************************************/
  onFetchKeys () {
    this.keys = this.keys.clear()
    this.keysIndex = this.keysIndex.clear()
    this.selectedKey = null
    this.selectedIndex = null
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

  onFetchKeysAdd (newKeys) {
    this.loading = false
    this.loaded = true
    this.keys = this.keys.withMutations((keys) => {
      this.keysIndex = this.keysIndex.withMutations((index) => {
        newKeys.forEach(function (key) {
          keys.set(key.key, Immutable.Map(key))
          index.push(key.key)
        })
      })
    })
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
    // @todo Maybe set a loading flag on each key?
  }

  onFetchValuesAdd (values) {
    this.keys = this.keys.withMutations((keys) => {
      _.each(values, (value, key) => {
        keys.update(key, (item) => item.set('value', value))
      })
    })
  }

  onFetchValuesFailed (err) {
    this.error = err
  }
}

export default alt.createStore(BrowseStore)
