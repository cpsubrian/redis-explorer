import React from 'react';

const ValuesRow = React.createClass({

  render () {
    return (
      <tr className="values-row" style={this.props.style}>
        <td className="key">{this.props.rowNum} {this.props.rowKey}</td>
        <td className="value">{this.props.rowValue}</td>
      </tr>
    );
  }
});

export default ValuesRow;
