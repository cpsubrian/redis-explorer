import remote from 'remote';
import React from 'react';
import {RouteHandler} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import mui from 'material-ui';
import util from '../utils/Util';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  ToolbarSeparator,
  DropDownMenu
} from 'material-ui';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Create a mui theme manager.
const ThemeManager = new mui.Styles.ThemeManager();

// Main app component.
const Main = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState () {
    return {
      fullscreen: remote.getCurrentWindow().isMaximized()
    };
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getHostMenuItems () {
    return [
      {payload: 'localhost', text: 'localhost'}
    ];
  },

  handleClose () {
    if (util.isWindows()) {
      remote.getCurrentWindow().close();
    } else {
      remote.getCurrentWindow().hide();
    }
  },

  handleMinimize () {
    remote.getCurrentWindow().minimize();
  },

  handleFullscreen () {
    if (util.isWindows()) {
      if (remote.getCurrentWindow().isMaximized()) {
        remote.getCurrentWindow().unmaximize();
      } else {
        remote.getCurrentWindow().maximize();
      }
      this.setState({
        fullscreen: remote.getCurrentWindow().isMaximized()
      });
    } else {
      remote.getCurrentWindow().setFullScreen(!remote.getCurrentWindow().isFullScreen());
      this.setState({
        fullscreen: remote.getCurrentWindow().isFullScreen()
      });
    }
  },

  renderWindowButtons () {
    if (util.isWindows()) {
      return (
        <div className="windows-buttons">
          <div className="windows-button button-minimize enabled" onClick={this.handleMinimize}><div className="icon"></div></div>
          <div className={`windows-button ${this.state.fullscreen ? 'button-fullscreenclose' : 'button-fullscreen'} enabled`} onClick={this.handleFullscreen}><div className="icon"></div></div>
          <div className="windows-button button-close enabled" onClick={this.handleClose}></div>
        </div>
      );
    }
    else {
      return (
        <div className="osx-buttons">
          <div className="button button-close enabled" onClick={this.handleClose}></div>
          <div className="button button-minimize enabled" onClick={this.handleMinimize}></div>
          <div className="button button-fullscreen enabled" onClick={this.handleFullscreen}></div>
        </div>
      );
    }
  },

  render () {
    return (
      <div className="main">
        <div className="toolbar">
          <div className="buttons">{util.isWindows() ? '' : this.renderWindowButtons()}</div>
          <Toolbar>
            <ToolbarGroup key={0} float="left">
              <div className="logo">
                <img src="images/logo.png" />
              </div>
              <ToolbarTitle text="RedisExplorer" />
            </ToolbarGroup>
            <ToolbarGroup key={1} float="right" className="no-drag">
              <ToolbarSeparator/>
              <DropDownMenu menuItems={this.getHostMenuItems()} />
            </ToolbarGroup>
          </Toolbar>
        </div>
        <RouteHandler/>
      </div>
    );
  }
});

export default Main;