import React from 'react'
import _ from 'underscore'
import connectToStores from 'alt/utils/connectToStores'
import hostsStore from '../stores/hostsStore'
import keyStore from '../stores/keyStore'
import keyActions from '../actions/keyActions'
import ValuesTable from '../components/ValuesTable'

// BrowserHandler Component
const BrowseHandler = React.createClass({

  propTypes: {
    loaded: React.PropTypes.bool,
    connected: React.PropTypes.bool,
    match: React.PropTypes.string
  },

  statics: {
    getStores () {
      return [hostsStore, keyStore]
    },
    getPropsFromStores () {
      return _.extend({}, hostsStore.getState(), keyStore.getState())
    }
  },

  // Since prop updates can happend very frequently and fetchKeys is
  // expensive, we debounce calls to it.
  componentWillMount () {
    this.fetchKeys = _.debounce(this.fetchKeys.bind(this), 250)
  },

  componentDidMount () {
    if (!this.props.loaded) {
      this.fetchKeys({match: this.props.match})
    }
  },

  componentWillUpdate (nextProps) {
    // Match text changed.
    if (this.props.match !== nextProps.match) {
      this.fetchKeys({match: nextProps.match})
    }
    // Just connected to a new host.
    if (!this.props.connected && nextProps.connected) {
      this.fetchKeys({match: this.props.match})
    }
  },

  fetchKeys (options) {
    if (this.props.connected) {
      keyActions.fetchKeys({
        match: options.match ? options.match + '*' : null,
        loadTypes: true
      })
    }
  },

  render () {
    return (
      <div className='browse'>
        <ValuesTable {...this.props}/>
      </div>
    )
  }
})

export default connectToStores(BrowseHandler)
