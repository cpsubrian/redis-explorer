import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import keyStore from '../stores/keyStore';

import LoadingRow from '../components/LoadingRow';
import ValuesRow from '../components/ValuesRow';

const ValuesTable = React.createClass({

  propTypes: {
    loading: React.PropTypes.bool,
    keys: React.PropTypes.array
  },

  getDefaultProps () {
    return {
      loading: false,
      keys: []
    };
  },

  renderRows () {
    return this.props.keys.map((key) => {
      return <ValuesRow key={key} valueKey={key}/>;
    });
  },

  render () {
    return (
      <div className="values-table">
        <table>
          <thead>
            <tr>
              <th className="key">Key</th>
              <th className="value">Value</th>
            </tr>
          </thead>
          <tbody>
            {this.props.loading ?
              <LoadingRow cols={2} />
            :
              this.renderRows()
            }
          </tbody>
        </table>
      </div>
    );
  }
});

export default ValuesTable;