import React from 'react'
import pureRender from 'pure-render-decorator'
import ImmutablePropTypes from 'react-immutable-proptypes'
import HashDetails from '../components/details/HashDetails'
import ListDetails from '../components/details/ListDetails'
import SetDetails from '../components/details/SetDetails'
import SortedSetDetails from '../components/details/SortedSetDetails'
import StringDetails from '../components/details/StringDetails'

@pureRender
class KeyDetails extends React.Component {

  static propTypes = {
    item: ImmutablePropTypes.map
  }

  render () {
    switch (this.props.item.get('type')) {
      case 'string':
        return <StringDetails {...this.props}/>
      case 'list':
        return <ListDetails {...this.props}/>
      case 'set':
        return <SetDetails {...this.props}/>
      case 'zset':
        return <SortedSetDetails {...this.props}/>
      case 'hash':
        return <HashDetails {...this.props}/>
    }
  }
}

export default KeyDetails
