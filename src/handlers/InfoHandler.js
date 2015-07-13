import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import autobind from 'autobind-decorator'
import pureRender from 'pure-render-decorator'
import connectToStores from 'alt/utils/connectToStores'
import debounce from '../utils/debounce'
import hostsStore from '../stores/hostsStore'
import hostsActions from '../actions/hostsActions'
import HostInfo from '../components/HostInfo'

@pureRender
@connectToStores
@autobind
class InfoHandler extends React.Component {

  static propTypes = {
    connected: React.PropTypes.bool,
    hostInfoLoading: React.PropTypes.bool,
    hostInfo: ImmutablePropTypes.map
  }

  static getStores () {
    return [hostsStore]
  }

  static getPropsFromStores () {
    return hostsStore.getState()
  }

  componentWillMount () {
    if (this.props.connected) {
      this.fetchHostInfo()
    }
  }

  componentDidMount () {
    this.refreshInterval = setInterval(() => this.fetchHostInfo(true), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.refreshInterval)
  }

  componentWillReceiveProps (nextProps) {
    // Connected to a new server.
    if (this.props.connected !== nextProps.connected) {
      this.fetchHostInfo()
    }
  }

  @debounce(250)
  fetchHostInfo (isRefresh) {
    hostsActions.fetchHostInfo(isRefresh)
  }

  render () {
    return (
      <div className='info'>
        {!this.props.hostInfo ?
          (this.props.hostInfoLoading ?
            <p>Loading Info</p>
          : null)
        :/*else*/
          <HostInfo {...this.props}/>
        }
      </div>
    )
  }
}

export default InfoHandler
