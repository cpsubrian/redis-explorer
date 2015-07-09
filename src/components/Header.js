import React from 'react'
import {Link} from 'react-router'
import autobind from 'autobind-decorator'
import hostsActions from '../actions/hostsActions'
import browseActions from '../actions/browseActions'
import Icon from '../components/Icon'
import {LeftNav, MenuItem, Toolbar, ToolbarGroup} from 'material-ui'

@autobind
class Header extends React.Component {

  static propTypes = {
    hosts: React.PropTypes.array,
    activeHost: React.PropTypes.object,
    connecting: React.PropTypes.bool,
    connected: React.PropTypes.bool
  }

  onClickHostButton (e) {
    e.preventDefault()
    this.refs.hostsNav.toggle()
  }

  onChangeHost (e, i, menuItem) {
    if (menuItem.host.Host !== this.props.activeHost.Host) {
      browseActions.resetKeys()
      hostsActions.connectToHost(menuItem.host)
    }
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

  getHostsNavProps () {
    let selectedIndex
    let menuItems

    menuItems = this.props.hosts.map((host, i) => {
      if (this.props.activeHost === host) {
        selectedIndex = i
      }
      return {
        host: host,
        text: <span className='host-option'><Icon type='public'/> {host.Host}</span>
      }
    })

    // Splice in subheaders.
    menuItems.splice(0, 0, {type: MenuItem.Types.SUBHEADER, text: 'Local' })
    menuItems.splice(2, 0, {type: MenuItem.Types.SUBHEADER, text: 'Remote' })

    // Adjust selected index.
    if (selectedIndex === 0) {
      selectedIndex = 1
    } else {
      selectedIndex += 2
    }

    return {
      docked: false,
      openRight: true,
      onChange: this.onChangeHost,
      selectedIndex: selectedIndex,
      menuItems: menuItems
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
                {this.props.activeHost.Host} <Icon type='public'/>
              </Link>
            :/*else*/
              <span>Not Connected</span>
            }
            <LeftNav ref='hostsNav' {...this.getHostsNavProps()} />
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
}

export default Header
