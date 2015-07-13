import React from 'react'
import autobind from 'autobind-decorator'
import ImmutablePropTypes from 'react-immutable-propTypes'
import hostsActions from '../actions/hostsActions'
import browseActions from '../actions/browseActions'
import Icon from '../components/Icon'
import {LeftNav, MenuItem} from 'material-ui'

@autobind
class HostsNav extends React.Component {

  static propTypes = {
    hosts: ImmutablePropTypes.list,
    activeHost: ImmutablePropTypes.map
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(
      nextProps.hosts === this.props.hosts &&
      nextProps.activeHost.get('Host') === this.props.activeHost.get('Host')
    )
  }

  toggle () {
    this.refs.nav.toggle()
  }

  onChangeHost (e, i, menuItem) {
    if (menuItem.host.get('Host') !== this.props.activeHost.get('Host')) {
      browseActions.resetKeys()
      hostsActions.connectToHost(menuItem.host)
    }
  }

  render () {
    let selectedIndex
    let menuItems

    menuItems = this.props.hosts.map((host, i) => {
      if (this.props.activeHost === host) {
        selectedIndex = i
      }
      return {
        host: host,
        text: <span className='host-option'><Icon type='public'/> {host.get('Host')}</span>
      }
    }).toArray()

    // Splice in subheaders.
    menuItems.splice(0, 0, {type: MenuItem.Types.SUBHEADER, text: 'Local' })
    menuItems.splice(2, 0, {type: MenuItem.Types.SUBHEADER, text: 'Remote' })

    // Adjust selected index.
    if (selectedIndex === 0) {
      selectedIndex = 1
    } else {
      selectedIndex += 2
    }

    return (
      <LeftNav ref='nav'
        docked={false}
        openRight={true}
        onChange={this.onChangeHost}
        selectedIndex={selectedIndex}
        menuItems={menuItems} />
    )
  }
}

export default HostsNav
