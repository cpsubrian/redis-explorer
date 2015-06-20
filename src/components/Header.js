import remote from 'remote';
import React from 'react';
import util from '../utils/Util';
import {
  DropDownMenu,
  IconButton,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from 'material-ui';

import Icon from '../components/Icon';

const Header = React.createClass({

  getInitialState () {
    return {
      fullscreen: remote.getCurrentWindow().isMaximized()
    };
  },

  getServerMenuItems () {
    return [
      {payload: 'localhost', text: 'localhost'}
    ];
  },

  render () {
    return (
      <div className="header">
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <IconButton tooltip="Keys"><Icon type="list"/></IconButton>
            <IconButton tooltip="Pub/Sub"><Icon type="import_export"/></IconButton>
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right" className="no-drag">
            <DropDownMenu menuItems={this.getServerMenuItems()}/>
            <ToolbarSeparator/>
            <IconButton tooltip="Settings"><Icon type="settings"/></IconButton>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
});

export default Header;
