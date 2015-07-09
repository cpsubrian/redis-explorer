import React from 'react'

class Icon extends React.Component {

  static propTypes = {
    type: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
    title: React.PropTypes.string,
    className: React.PropTypes.string
  }

  static defaultProps = {
    style: {}
  }

  render () {
    return (
      <i className={'icon material-icons ' + (this.props.className || '')}
         style={this.props.style}
         title={this.props.title}
      >{this.props.type}</i>
    )
  }
}

export default Icon
