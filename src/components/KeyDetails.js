import React from 'react'
import keys from '../utils/keys'
import TypeIcon from '../components/TypeIcon'
import Highlight from '../components/Highlight'

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
          value = (
            <Highlight className='json'>
              {JSON.stringify(JSON.parse(this.props.value), null, 2)}
            </Highlight>
          )
        } catch (e) {
          value = <pre>{this.props.value}</pre>
        }
        return value
      default:
        return null
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
