import React from 'react';

const LoadingRow = React.createClass({

  propTypes: {
    cols: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      cols: 1
    };
  },

  render () {
    return (
      <tr className="loading-row">
        <td colSpan={this.props.cols}>
          Loading&hellip;
        </td>
      </tr>
    );
  }
});

export default LoadingRow;
