import React from 'react';
import _ from 'underscore';
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

  componentWillMount () {
    this.fetchKeys = _.debounce(this.fetchKeys.bind(this), 250);
  },

  componentDidMount () {
    if (!this.props.loaded) {
      this.fetchKeys({match: this.props.match ? this.props.match + '*' : null});
    }
  },

  componentWillUpdate (nextProps) {
    if (this.props.match !== nextProps.match) {
      this.fetchKeys({match: nextProps.match ? nextProps.match + '*' : null});
    }
  },

  fetchKeys (options) {
    keyActions.fetchKeys(options);
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