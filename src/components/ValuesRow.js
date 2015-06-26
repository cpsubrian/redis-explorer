import React from 'react';
import Icon from '../components/Icon';

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

  renderIcon () {
    let props;
    if (this.props.type === 'string') {
      props = {
        type: 'vpn_key',
        title: 'String'
      };
    }
    if (this.props.type === 'list') {
      props = {
        type: 'format_list_numbered',
        title: 'List'
      };
    }
    if (this.props.type === 'set') {
      props = {
        type: 'reorder',
        title: 'Set'
      };
    }
    if (this.props.type === 'zset') {
      props = {
        type: 'format_line_spacing',
        title: 'Sorted Set'
      };
    }
    if (this.props.type === 'hash') {
      props = {
        type: 'code',
        title: 'Hash'
      };
    }
    return <Icon {...props}/>
  },

  render () {
    return (
      <tr className="values-row" style={this.props.style}>
        <td className="key">{this.renderKey()}</td>
        <td className="value">{this.props.value}</td>
        <td className="type">{this.renderIcon()}</td>
      </tr>
    );
  }
});

export default ValuesRow;
