import React from 'react';

const Icon = React.createClass({

  propTypes: {
    type: React.PropTypes.string.isRequired,
    style: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      style: {}
    };
  },

  render () {
    return (
      <i className={"icon material-icons " + (this.props.className || '')}
         style={this.props.style}>{this.props.type}</i>
    );
  }

});

export default Icon;
