import React from 'react'
import pureRender from 'pure-render-decorator'
import ImmutablePropTypes from 'react-immutable-proptypes'
import clipboard from 'clipboard'
import Details from '../../components/details/Details'
import Highlight from '../../components/Highlight'
import Icon from '../../components/Icon'

@pureRender
class ListDetails extends React.Component {

  static propTypes = {
    item: ImmutablePropTypes.map
  }

  state = {
    types: ['JSON', 'Raw'],
    show: 'JSON',
    hasJSON: false
  }

  renderValue () {
    let values = this.props.item.get('value')
    return values.map((value, i) => {
      let result
      try {
        if (this.state.show === 'Raw') {
          result = <pre><code>{value}</code></pre>
        } else {
          result = (
            <Highlight className='json'>
              {JSON.stringify(JSON.parse(value), null, 2)}
            </Highlight>
          )
        }
        this.state.hasJSON = true
      } catch (e) {
        result = <pre><code>{value}</code></pre>
      }
      return (
        <div key={i} className='value-item'>
          {result}
          <div className='actions'>
            <span className='index'>{i}</span>
            <a href='#' onClick={(e) => clipboard.writeText(value)}>
              <Icon type='content_paste'/>
            </a>
          </div>
        </div>
      )
    })
  }

  renderButtons () {
    let buttons = {}

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

    return React.addons.createFragment(buttons)
  }

  render () {
    let {_key, type} = this.props.item.toJS()
    return (
      <Details _key={_key} type={type} value={this.renderValue()} buttons={this.renderButtons()}/>
    )
  }
}

export default ListDetails
