import React from 'react';
import _ from 'underscore';
import connectToStores from 'alt/utils/connectToStores';
import hostsStore from '../stores/hostsStore';
import keyStore from '../stores/keyStore';
import keyActions from '../actions/keyActions';
import ValuesTable from '../components/ValuesTable';

const BrowseHandler = React.createClass({

  statics: {
    getStores () {
      return [hostsStore, keyStore];
    },
    getPropsFromStores () {
      return _.extend({}, hostsStore.getState(), keyStore.getState());
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
    if (!this.props.connected && nextProps.connected) {
      this.fetchKeys({match: this.props.match ? this.props.match + '*' : null});
    }
  },

  fetchKeys (options) {
    if (this.props.connected) {
      keyActions.fetchKeys(options);
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