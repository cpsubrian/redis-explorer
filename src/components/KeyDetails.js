import React from 'react'
import HashDetails from '../components/details/HashDetails'
import ListDetails from '../components/details/ListDetails'
import SetDetails from '../components/details/SetDetails'
import SortedSetDetails from '../components/details/SortedSetDetails'
import StringDetails from '../components/details/StringDetails'

const KeyDetails = React.createClass({

  propTypes: {
    _key: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    buttons: React.PropTypes.node
  },

  render () {
    switch (this.props.type) {
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
})

export default KeyDetails
