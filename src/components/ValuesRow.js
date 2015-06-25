import React from 'react';

const ValuesRow = React.createClass({

  renderKey () {
    // Highlight search pattern matches.
    if (this.props.matchRegExp) {
      return this.props.rowKey
        .split(this.props.matchRegExp)
        .map((part, i) => {
          if (i>0 && i%2) {
            return <strong>{part}</strong>;
          }
          else {
            return part;
          }
        });
    }
    // Else, just spit out the key.
    else {
      return this.props.rowKey;
    }
  },

  render () {
    return (
      <tr className="values-row" style={this.props.style}>
        <td className="key">{this.renderKey()}</td>
        <td className="value">{this.props.rowValue}</td>
      </tr>
    );
  }
});

export default ValuesRow;
