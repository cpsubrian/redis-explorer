import React from 'react'
import browseActions from '../actions/browseActions'
import TypeIcon from '../components/TypeIcon'

const ValuesRow = React.createClass({

  propTypes: {
    _key: React.PropTypes.string,
    type: React.PropTypes.string,
    style: React.PropTypes.object,
    value: React.PropTypes.string,
    matchRegExp: React.PropTypes.object,
    selected: React.PropTypes.bool
  },

  onClick (e) {
    browseActions.toggleSelectedKey(this.props._key)
  },

  renderKey () {
    // Highlight search pattern matches.
    if (this.props.matchRegExp) {
      return this.props._key
        .split(this.props.matchRegExp)
        .map((part, i) => {
          if (i > 0 && i % 2) {
            return <strong key={i}>{part}</strong>
          } else {
            return part
          }
        })
    // Else, just spit out the key.
    } else {
      return this.props._key
    }
  },

  render () {
    var classes = 'values-row'
    if (this.props.selected) {
      classes += ' selected'
    }
    return (
      <tr className={classes} style={this.props.style} onClick={this.onClick}>
        <td className='key'>{this.renderKey()}</td>
        <td className='value'>{this.props.value ? this.props.value.substr(0, 400) : null}</td>
        <td className='type'><TypeIcon type={this.props.type}/></td>
      </tr>
    )
  }
})

export default ValuesRow
