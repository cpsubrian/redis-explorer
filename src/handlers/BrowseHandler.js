import React from 'react'
import connectToStores from 'alt/utils/connectToStores'
import debounce from '../utils/debounce'
import hostsStore from '../stores/hostsStore'
import browseStore from '../stores/browseStore'
import browseActions from '../actions/browseActions'
import ValuesTable from '../components/ValuesTable'
import KeyDetails from '../components/KeyDetails'
import SidePanel from '../components/SidePanel'
import Icon from '../components/Icon'
import {IconButton} from 'material-ui'

// BrowserHandler Component
const BrowseHandler = React.createClass({

  propTypes: {
    loaded: React.PropTypes.bool,
    connected: React.PropTypes.bool,
    match: React.PropTypes.string,
    selectedKey: React.PropTypes.object
  },

  statics: {
    getStores () {
      return [hostsStore, browseStore]
    },
    getPropsFromStores () {
      return Object.assign({}, hostsStore.getState(), browseStore.getState())
    }
  },

  getInitialState () {
    return {
      keyDetailsDocked: !!this.props.selectedKey
    }
  },

  componentDidMount () {
    if (!this.props.loaded && this.props.connected) {
      this.fetchKeys({match: this.props.match})
    }
  },

  componentWillReceiveProps (nextProps) {
    // Match text changed.
    if (this.props.match !== nextProps.match) {
      this.fetchKeys({match: nextProps.match})
    }
    // Just connected to a new host.
    if (!this.props.connected && nextProps.connected) {
      this.fetchKeys({match: this.props.match})
    }
    // A new key was selected.
    if (nextProps.selectedKey && !this.state.keyDetailsDocked) {
      this.toggleKeyDetails()
    }
    // A key was unselected.
    if (this.props.selectedKey && !nextProps.selectedKey) {
      this.toggleKeyDetails()
    }
  },

  @debounce(250)
  fetchKeys (options = {}) {
    options.match = options.match ? options.match + '*' : null
    browseActions.fetchKeys(options)
  },

  toggleKeyDetails () {
    this.refs.keyDetailsPanel.toggle()
    this.setState({
      keyDetailsDocked: !this.state.keyDetailsDocked
    })
  },

  onClickClose (e) {
    browseActions.toggleSelectedKey(this.props.selectedKey.key)
  },

  render () {
    return (
      <div className='browse'>
        <ValuesTable {...this.props}/>
        <SidePanel
          ref='keyDetailsPanel'
          className='key-details-panel'
          openRight={true}
          docked={this.state.keyDetailsDocked}
          width={500}>
          <IconButton className='close' onClick={this.onClickClose}>
            <Icon type='cancel'/>
          </IconButton>
          <KeyDetails ref='keyDetails' {...this.props.selectedKey}/>
        </SidePanel>
      </div>
    )
  }
})

export default connectToStores(BrowseHandler)
