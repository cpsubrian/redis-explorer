import React from 'react'
import pureRender from 'pure-render-decorator'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Details from '../../components/details/Details'

@pureRender
class SortedSetDetails extends React.Component {

  static propTypes = {
    item: ImmutablePropTypes.map
  }

  render () {
    return (
      <Details {...this.props.item.toJS()}/>
    )
  }
}

export default SortedSetDetails
