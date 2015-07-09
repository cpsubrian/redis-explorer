import React from 'react'
import Icon from '../components/Icon'
import keys from '../utils/keys'

class TypeIcon extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    type: React.PropTypes.string
  }

  render () {
    let props = {
      title: keys.getTypeName(this.props.type)
    }
    if (this.props.type === 'string') {
      props.type = 'vpn_key'
    }
    if (this.props.type === 'list') {
      props.type = 'format_list_numbered'
    }
    if (this.props.type === 'set') {
      props.type = 'reorder'
    }
    if (this.props.type === 'zset') {
      props.type = 'format_line_spacing'
    }
    if (this.props.type === 'hash') {
      props.type = 'code'
    }
    return <Icon className='type-icon' {...props}/>
  }
}

export default TypeIcon
