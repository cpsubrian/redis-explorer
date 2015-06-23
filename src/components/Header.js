import React from 'react';
import {Link} from 'react-router'
import {
  DropDownMenu,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from 'material-ui';

import Icon from '../components/Icon';

const Header = React.createClass({

  getServerMenuItems () {
    return [
      {payload: 'localhost', text: 'localhost'}
    ];
  },

  render () {
    return (
      <div className="header">
        <Toolbar className="toolbar">
          <ToolbarGroup key={0} float="left">
            <Link to="/" className="button">
              <Icon type="list"/>
              Browse
            </Link>
            <Link to="/pubsub" className="button">
              <Icon type="import_export"/>
              Pub/Sub
            </Link>
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right" className="no-drag">
            <DropDownMenu menuItems={this.getServerMenuItems()}/>
            <ToolbarSeparator/>
            <Link to="/settings" className="button">
              <Icon type="settings"/>
            </Link>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
});

export default Header;
