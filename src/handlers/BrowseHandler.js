import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import keyStore from '../stores/keyStore';
import keyActions from '../actions/keyActions';

import ValuesTable from '../components/ValuesTable';

const BrowseHandler = React.createClass({

  statics: {
    getStores () {
      return [keyStore];
    },
    getPropsFromStores () {
      return keyStore.getState();
    }
  },

  componentDidMount() {
    if (!this.props.loading && !this.props.loaded) {
      keyActions.fetchKeys();
    }
  },

  render () {
    return (
      <div className="browse">
        <ValuesTable {...this.props}/>
      </div>
    );
  }
});

export default connectToStores(BrowseHandler);