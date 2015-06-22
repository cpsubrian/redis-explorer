import React from 'react';
import {RouteHandler} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import mui from 'material-ui';

import Header from '../components/Header';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Create a mui theme manager.
const ThemeManager = new mui.Styles.ThemeManager();

// Main app component.
const MainHandler = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render () {
    return (
      <div className="main">
        <Header hostName="localhost"/>
        <RouteHandler/>
      </div>
    );
  }
});

export default MainHandler;
