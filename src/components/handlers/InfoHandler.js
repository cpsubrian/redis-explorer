import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import autobind from 'autobind-decorator'
import pureRender from 'pure-render-decorator'
import connectToStores from 'alt/utils/connectToStores'
import throttle from '../../utils/throttle'
import hostsStore from '../../stores/hostsStore'
import hostsActions from '../../actions/hostsActions'
import HostInfo from '../../components/HostInfo'

/**
 * Wrap the Info component so we can handle transisions.
 */
@pureRender
class InfoHandler extends React.Component {

  static willTransitionTo () {
    let {hostInfo, connected} = hostsStore.getState()
    if (!hostInfo && connected) {
      hostsActions.fetchHostInfo()
    }
  }

  render () {
    return <Info />
  }
}

/**
 * Info component.
 */
@connectToStores
@pureRender
@autobind
class Info extends React.Component {

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

  @throttle(250)
  fetchHostInfo (isRefresh) {
    hostsActions.fetchHostInfo.defer(isRefresh)
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
