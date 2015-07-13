import React from 'react'
import pureRender from 'pure-render-decorator'
import ImmutablePropTypes from 'react-immutable-proptypes'
import clipboard from 'clipboard'
import Details from '../../components/details/Details'
import Highlight from '../../components/Highlight'

@pureRender
class KeyDetails extends React.Component {

  static propTypes = {
    item: ImmutablePropTypes.map
  }

  state = {
    types: ['JSON', 'Raw'],
    show: 'JSON',
    hasJSON: false
  }

  renderValue () {
    let value = this.props.item.get('value')
    try {
      if (this.state.show === 'Raw') {
        value = <pre><code>{value}</code></pre>
      } else {
        value = (
          <Highlight className='json'>
            {JSON.stringify(JSON.parse(value), null, 2)}
          </Highlight>
        )
      }
      this.state.hasJSON = true
    } catch (e) {
      value = <pre><code>{value}</code></pre>
    }
    return value
  }

  renderButtons () {
    let buttons = {}
    let value = this.props.item.get('value')

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
      <a href='#' onClick={(e) => clipboard.writeText(value)}>Copy</a>
    )

    return React.addons.createFragment(buttons)
  }

  render () {
    return (
      <Details {...this.props.item.toJS()}
        value={this.renderValue()}
        buttons={this.renderButtons()}
      />
    )
  }
}

export default KeyDetails
