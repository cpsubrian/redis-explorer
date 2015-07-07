import React from 'react'
import keys from '../utils/keys'
import TypeIcon from '../components/TypeIcon'
import Highlight from '../components/Highlight'

const KeyDetails = React.createClass({

  propTypes: {
    _key: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
  },

  getInitialState () {
    return {
      types: null,
      defaultType: 'default',
      show: 'default'
    }
  },

  renderButtons () {
    var fragment = {}

    // Create types buttons.
    if (this.state.types) {
      let show = (this.state.show === 'default') ? this.state.defaultType : this.state.show
      fragment.show = (
        <div className='pill'>
          {this.state.types.map((type) => {
            return (
              <a
                key={type}
                href='#'
                className={(show === type) ? 'active' : null}
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

    return <div className='buttons'>{React.addons.createFragment(fragment)}</div>
  },

  renderValue () {
    let value = null

    switch (this.props.type) {
      case 'string':
        try {
          if (this.state.show === 'Raw') {
            value = (
              <pre>
                <code>{this.props.value}</code>
              </pre>
            )
          } else {
            value = (
              <Highlight className='json'>
                {JSON.stringify(JSON.parse(this.props.value), null, 2)}
              </Highlight>
            )
          }
          this.state.defaultType = 'JSON'
          this.state.types = ['JSON', 'Raw']
        } catch (e) {
          value = <pre><code>{this.props.value}</code></pre>
        }
        break
      case 'list':
        value = '[List Value Here]'
        break
      case 'set':
        value = '[Set Value Here]'
        break
      case 'zset':
        value = '[Sorted Sert Value Here]'
        break
      case 'hash':
        value = '[Hash Value Here]'
        break
    }

    return value
  },

  render () {
    let value = this.renderValue()
    return (
      <div className='key-details'>
        <div className='key'>
          {this.props._key}
        </div>
        <div className='type'>
          <TypeIcon type={this.props.type}/>
          <span className='type-name'>{keys.getTypeName(this.props.type)}</span>
          {this.renderButtons()}
        </div>
        <div className='value'>
          {value}
        </div>
      </div>
    )
  }
})

export default KeyDetails
