import React from 'react'
import keys from '../../utils/keys'
import TypeIcon from '../../components/TypeIcon'

class Details extends React.Component {

  static propTypes = {
    _key: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    value: React.PropTypes.node.isRequired,
    buttons: React.PropTypes.node
  }

  render () {
    return (
      <div className='key-details'>
        <div className='key'>
          {this.props._key}
        </div>
        <div className='type'>
          <TypeIcon type={this.props.type}/>
          <span className='type-name'>{keys.getTypeName(this.props.type)}</span>
          {this.props.buttons ?
            <div className='buttons'>
              {this.props.buttons}
            </div>
          : null}
        </div>
        <div className='value'>
          {this.props.value}
        </div>
      </div>
    )
  }
}

export default Details
