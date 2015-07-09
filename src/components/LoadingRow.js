import React from 'react'

class LoadingRow extends React.Component {

  static propTypes = {
    cols: React.PropTypes.number
  }

  static defaultProps = {
    cols: 1
  }

  render () {
    return (
      <tr className='loading-row'>
        <td colSpan={this.props.cols}>
          Loading&hellip;
        </td>
      </tr>
    )
  }
}

export default LoadingRow
