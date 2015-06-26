import React from 'react'
import connectToStores from 'alt/utils/connectToStores'
import debounce from '../utils/debounce'
import hostsStore from '../stores/hostsStore'
import browseStore from '../stores/browseStore'
import browseActions from '../actions/browseActions'
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
      return [hostsStore, browseStore]
    },
    getPropsFromStores () {
      return Object.assign({}, hostsStore.getState(), browseStore.getState())
    }
  },

  @debounce(250)
  fetchKeys (options = {}) {
    options.match = options.match ? options.match + '*' : null
    browseActions.fetchKeys(options)
  },

  componentDidMount () {
    if (!this.props.loaded && this.props.connected) {
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

  render () {
    return (
      <div className='browse'>
        <ValuesTable {...this.props}/>
      </div>
    )
  }
})

export default connectToStores(BrowseHandler)
