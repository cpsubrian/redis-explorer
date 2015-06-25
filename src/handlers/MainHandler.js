import React from 'react';
import {RouteHandler} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import mui from 'material-ui';
import connectToStores from 'alt/utils/connectToStores';
import hostsStore from '../stores/hostsStore';
import hostsActions from '../actions/hostsActions';
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

  statics: {
    getStores () {
      return [hostsStore];
    },
    getPropsFromStores () {
      return hostsStore.getState();
    }
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount () {
    hostsActions.connectToHost(this.props.activeHost);
  },

  render () {
    return (
      <div className="main">
        <Header {...this.props}/>
        <RouteHandler/>
      </div>
    );
  }
});

export default connectToStores(MainHandler);
