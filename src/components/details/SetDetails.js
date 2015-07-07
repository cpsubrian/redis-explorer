import React from 'react'
import Details from '../../components/details/Details'

const SetDetails = React.createClass({

  propTypes: {
    _key: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
  },

  render () {
    return (
      <Details
        _key={this.props._key}
        type={this.props.type}
        value={this.props.value}
      />
    )
  }
})

export default SetDetails
