import React from 'react';
import {Link} from 'react-router'
import hostsActions from '../actions/hostsActions';
import keyActions from '../actions/keyActions';
import {
  DropDownMenu,
  LeftNav,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from 'material-ui';

import Icon from '../components/Icon';

const Header = React.createClass({

  propTypes: {
    hosts: React.PropTypes.array,
    activeHost: React.PropTypes.object
  },

  getHostsMenuItems () {
    return this.props.hosts.map((host) => {
      return {
        host: host,
        text: <span className="host-option"><Icon type="public"/> {host.Host}</span>
      };
    });
  },

  onClickHostButton (e) {
    e.preventDefault();
    this.refs.hostsNav.toggle();
  },

  onChangeHost (e, i, menuItem) {
    keyActions.resetKeys();
    hostsActions.connectToHost(menuItem.host);
  },

  hostButtonClass () {
    if (this.props.connecting) {
      return 'connecting';
    }
    else if (this.props.connected) {
      return 'connected';
    }
    else {
      return 'disconnected';
    }
  },

  render () {
    return (
      <div className="header">
        <Toolbar className="toolbar">
          <ToolbarGroup key={0} float="left">
            <Link to="/" className="button">
              <Icon type="search"/> Browse
            </Link>
            <Link to="/pubsub" className="button">
              <Icon type="swap_vert"/> Pub/Sub
            </Link>
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right" className="no-drag">
            {this.props.activeHost ?
              <Link to="/hosts" className="button host-button" onClick={this.onClickHostButton}>
                {this.props.activeHost.Host} <Icon className={this.hostButtonClass()} type="public"/>
              </Link>
            :
              <span>Not Connected</span>
            }
            <LeftNav
              ref="hostsNav"
              docked={false}
              openRight={true}
              onChange={this.onChangeHost}
              menuItems={this.getHostsMenuItems()} />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
});

export default Header;
