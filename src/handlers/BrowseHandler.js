import React from 'react'
import autobind from 'autobind-decorator'
import connectToStores from 'alt/utils/connectToStores'
import pureRender from 'pure-render-decorator'
import debounce from '../utils/debounce'
import hostsStore from '../stores/hostsStore'
import browseStore from '../stores/browseStore'
import browseActions from '../actions/browseActions'
import {IconButton} from 'material-ui'
import ValuesTable from '../components/ValuesTable'
import KeyDetails from '../components/KeyDetails'
import SidePanel from '../components/SidePanel'
import Icon from '../components/Icon'

@connectToStores
@pureRender
@autobind
class BrowseHandler extends React.Component {

  static propTypes = {
    loaded: React.PropTypes.bool,
    connected: React.PropTypes.bool,
    match: React.PropTypes.string,
    selectedKey: React.PropTypes.object
  }

  static getStores () {
    return [hostsStore, browseStore]
  }

  static getPropsFromStores () {
    return Object.assign({}, hostsStore.getState(), browseStore.getState())
  }

  state = {
    keyDetailsDocked: !!this.props.selectedKey
  }

  componentDidMount () {
    if (!this.props.loaded && this.props.connected) {
      this.fetchKeys({match: this.props.match})
    }
  }

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
  }

  @debounce(250)
  fetchKeys (options = {}) {
    options.match = options.match ? options.match + '*' : null
    browseActions.fetchKeys(options)
  }

  toggleKeyDetails () {
    this.refs.keyDetailsPanel.toggle()
    this.setState({
      keyDetailsDocked: !this.state.keyDetailsDocked
    })
  }

  onClickClose (e) {
    browseActions.toggleSelected()
  }

  render () {
    return (
      <div className='browse'>
        <ValuesTable {...this.props}/>
        <SidePanel
          ref='keyDetailsPanel'
          className='key-details-panel'
          openRight={true}
          docked={this.state.keyDetailsDocked}
          width={550}>
          <IconButton className='close' onClick={this.onClickClose}>
            <Icon type='cancel'/>
          </IconButton>
          {this.props.selectedKey ?
            <KeyDetails ref='keyDetails' item={this.props.selectedKey}/>
          :/*else*/
            null
          }
        </SidePanel>
      </div>
    )
  }
}

export default BrowseHandler
