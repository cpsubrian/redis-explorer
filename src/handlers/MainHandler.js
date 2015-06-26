import React from 'react'
import {RouteHandler} from 'react-router'
import mui from 'material-ui'
import connectToStores from 'alt/utils/connectToStores'
import hostsStore from '../stores/hostsStore'
import hostsActions from '../actions/hostsActions'
import Header from '../components/Header'

// Create a material-ui theme manager.
const ThemeManager = new mui.Styles.ThemeManager()

// Main app component.
const MainHandler = React.createClass({

  propTypes: {
    activeHost: React.PropTypes.object
  },

  statics: {
    getStores () {
      return [hostsStore]
    },
    getPropsFromStores () {
      return hostsStore.getState()
    }
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  componentWillMount () {
    hostsActions.connectToHost(this.props.activeHost)
  },

  render () {
    return (
      <div className='main'>
        <Header {...this.props}/>
        <RouteHandler/>
      </div>
    )
  }
})

export default connectToStores(MainHandler)
