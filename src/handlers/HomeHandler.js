import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import keyStore from '../stores/keyStore';
import keyActions from '../actions/keyActions';

import ValuesTable from '../components/ValuesTable';

const HomeHandler = React.createClass({

  statics: {
    getStores () {
      return [keyStore];
    },
    getPropsFromStores () {
      return keyStore.getState();
    }
  },

  componentDidMount() {
    keyActions.fetchKeys();
  },

  render () {
    return (
      <div className="home">
        <ValuesTable {...this.props}/>
      </div>
    );
  }
});

export default connectToStores(HomeHandler);