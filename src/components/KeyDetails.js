import React from 'react'
import keys from '../utils/keys'
import TypeIcon from '../components/TypeIcon'

const KeyDetails = React.createClass({

  propTypes: {
    _key: React.PropTypes.string,
    type: React.PropTypes.string,
    value: React.PropTypes.object
  },

  renderValue () {
    switch (this.props.type) {
      case 'string':
        let value
        try {
          value = JSON.parse(this.props.value)
        } catch (e) {
          value = this.props.value
        }
        return <pre>{JSON.stringify(value, null, 2)}</pre>
      default:
        return '[value]'
    }
  },

  render () {
    return (
      <div className='key-details'>
        <div className='key'>
          {this.props._key}
        </div>
        <div className='type'>
          <TypeIcon type={this.props.type}/>
          <span className='type-name'>{keys.getTypeName(this.props.type)}</span>
        </div>
        <div className='value'>
          {this.renderValue()}
        </div>
      </div>
    )
  }
})

export default KeyDetails
