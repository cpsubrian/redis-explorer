import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import keyStore from '../stores/keyStore';

import ScrollList from '../components/ScrollList';
import LoadingRow from '../components/LoadingRow';
import ValuesRow from '../components/ValuesRow';

const ValuesTable = React.createClass({

  propTypes: {
    loading: React.PropTypes.bool,
    keys: React.PropTypes.array,
    offset: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      loading: false,
      keys: [],
      offset: 0
    };
  },

  getItems () {
    return this.props.keys.map((key, i) => {
      return {
        key: key,
        rowNum: i,
        rowKey: key,
        rowValue: 'value'
      };
    });
  },

  renderRoot (props, children) {
    return <tbody {...props}>{children}</tbody>
  },

  renderItem (props, item) {
    return <ValuesRow {...props} {...item}/>
  },

  renderPlaceholder (props) {
    return <tr key={props.key}><td colSpan="2" {...props}></td></tr>;
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
          <ScrollList
            renderRoot={this.renderRoot}
            renderItem={this.renderItem}
            renderPlaceholder={this.renderPlaceholder}
            getItems={this.getItems}
            itemHeight={30}
            offset={this.props.offset}
          />
        </table>
      </div>
    );
  }
});

export default ValuesTable;