import React from 'react'
import pureRender from 'pure-render-decorator'
import autobind from 'autobind-decorator'
import ImmutablePropTypes from 'react-immutable-proptypes'
import browseActions from '../actions/browseActions'
import TypeIcon from '../components/TypeIcon'

@pureRender
@autobind
class ValuesRow extends React.Component {

  static propTypes = {
    index: React.PropTypes.number,
    style: React.PropTypes.object,
    matchRegExp: React.PropTypes.object,
    item: ImmutablePropTypes.map // @todo Enforce more specific shape here and elsewhere
  }

  onClick (e) {
    browseActions.toggleSelected({
      key: this.props.item.get('key'),
      index: this.props.index
    })
  }

  renderKey () {
    let key = this.props.item.get('key')

    // Highlight search pattern matches.
    if (this.props.matchRegExp) {
      return key
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
      return key
    }
  }

  render () {
    let {selected, value, type} = this.props.item.toJS()
    let classes = 'values-row' + (selected ? ' selected' : '')

    return (
      <tr className={classes} style={this.props.style} onClick={this.onClick}>
        <td className='key'>{this.renderKey()}</td>
        <td className='value'>{value ? value.substr(0, 400) : null}</td>
        <td className='type'><TypeIcon type={type}/></td>
      </tr>
    )
  }
}

export default ValuesRow
