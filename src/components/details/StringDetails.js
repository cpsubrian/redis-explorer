import React from 'react'
import clipboard from 'clipboard'
import Details from '../../components/details/Details'
import Highlight from '../../components/Highlight'

class KeyDetails extends React.Component {

  static propTypes = {
    _key: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
  }

  state = {
    types: ['JSON', 'Raw'],
    show: 'JSON',
    hasJSON: false
  }

  renderValue () {
    let value
    try {
      if (this.state.show === 'Raw') {
        value = <pre><code>{this.props.value}</code></pre>
      } else {
        value = (
          <Highlight className='json'>
            {JSON.stringify(JSON.parse(this.props.value), null, 2)}
          </Highlight>
        )
      }
      this.state.hasJSON = true
    } catch (e) {
      value = <pre><code>{this.props.value}</code></pre>
    }
    return value
  }

  renderButtons () {
    var buttons = {}

    // Create types buttons.
    if (this.state.hasJSON) {
      buttons.show = (
        <div className='pill'>
          {this.state.types.map((type) => {
            return (
              <a
                key={type}
                href='#'
                className={(this.state.show === type) ? 'active' : null}
                onClick={(e) => {
                  e.preventDefault()
                  this.setState({show: type})
                }}
              >
                {type}
              </a>
            )
          })}
        </div>
      )
    }

    // Todo make this into a component maybe?
    buttons.copy = (
      <a href='#' onClick={(e) => clipboard.writeText(this.props.value)}>Copy</a>
    )

    return React.addons.createFragment(buttons)
  }

  render () {
    let value = this.renderValue()
    let buttons = this.renderButtons()

    return (
      <Details
        _key={this.props._key}
        type={this.props.type}
        value={value}
        buttons={buttons}
      />
    )
  }
}

export default KeyDetails
