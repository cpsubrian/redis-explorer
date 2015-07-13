import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import autobind from 'autobind-decorator'
import {Link} from 'react-router'
import Icon from '../components/Icon'
import {Toolbar, ToolbarGroup} from 'material-ui'
import HostsNav from '../components/HostsNav'

// @todo add pureRender after I figure out how to account for Router state
// for <Link> changes.
@autobind
class Header extends React.Component {

  static propTypes = {
    hosts: ImmutablePropTypes.list,
    activeHost: ImmutablePropTypes.map,
    connecting: React.PropTypes.bool,
    connected: React.PropTypes.bool
  }

  onClickHostButton (e) {
    e.preventDefault()
    this.refs.hostsNav.toggle()
  }

  getHostButtonClass () {
    if (this.props.connecting) {
      return 'connecting'
    } else if (this.props.connected) {
      return 'connected'
    } else {
      return 'disconnected'
    }
  }

  render () {
    return (
      <div className='header'>
        <Toolbar className='toolbar'>
          <ToolbarGroup key={0} float='left'>
            <Link to='/' className='button'>
              <Icon type='search'/> Browse
            </Link>
            <Link to='/info' className='button'>
              <Icon type='info'/> Info
            </Link>
          </ToolbarGroup>
          <ToolbarGroup key={1} float='right' className='no-drag'>
            {this.props.activeHost ?
              <Link to='/hosts' className={'button host-button ' + this.getHostButtonClass()} onClick={this.onClickHostButton}>
                {this.props.activeHost.get('Host')} <Icon type='public'/>
              </Link>
            :/*else*/
              <span>Not Connected</span>
            }
            <HostsNav ref='hostsNav' {...this.props}/>
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
}

export default Header
