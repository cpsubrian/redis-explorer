import React from 'react'
import pureRender from 'pure-render-decorator'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Details from '../../components/details/Details'

@pureRender
class SetDetails extends React.Component {

  static propTypes = {
    item: ImmutablePropTypes.map
  }

  render () {
    return (
      <Details {...this.props.item.toJS()}/>
    )
  }
}

export default SetDetails
