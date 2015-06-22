import React from 'react';

const ValuesRow = React.createClass({

  render () {
    return (
      <tr className="values-row">
        <td className="key">{this.props.valueKey}</td>
        <td className="value">A Value</td>
      </tr>
    );
  }
});

export default ValuesRow;
