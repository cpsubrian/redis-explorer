import React from 'react'
import shell from 'shell'
import browseActions from '../actions/browseActions'

import {TextField} from 'material-ui'
import {HotKeys} from 'react-hotkeys'
import ScrollList from '../components/ScrollList'
import LoadingRow from '../components/LoadingRow'
import ValuesRow from '../components/ValuesRow'

const ValuesTable = React.createClass({

  propTypes: {
    loading: React.PropTypes.bool,
    finished: React.PropTypes.bool,
    keys: React.PropTypes.array,
    offset: React.PropTypes.number,
    itemHeight: React.PropTypes.number,
    match: React.PropTypes.string,
    matchRegExp: React.PropTypes.object,
    selectedIndex: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      loading: false,
      keys: [],
      offset: 0,
      itemHeight: 30
    }
  },

  getHotKeys () {
    return {
      down: (event) => {
        if (this.props.selectedIndex < (this.props.keys.length - 1)) {
          let nextKey = this.props.keys[this.props.selectedIndex + 1]._key
          this.refs.scrollList.ensureVisible(this.props.selectedIndex + 1)
          browseActions.toggleSelectedKey(nextKey)
        } else {
          shell.beep()
        }
      },
      up: (event) => {
        if (this.props.selectedIndex > 0) {
          let previousKey = this.props.keys[this.props.selectedIndex - 1]._key
          this.refs.scrollList.ensureVisible(this.props.selectedIndex - 1)
          browseActions.toggleSelectedKey(previousKey)
        } else {
          shell.beep()
        }
      }
    }
  },

  getItems () {
    return this.props.keys
  },

  onSearchChange (e) {
    browseActions.setMatch(e.currentTarget.value)
  },

  onScroll (e, newOffset) {
    if (newOffset) {
      browseActions.setOffset(newOffset)

      if (!this.props.finished) {
        let top = e.currentTarget.scrollTop
        let sh = e.currentTarget.scrollHeight
        let h = e.currentTarget.offsetHeight

        // If we're nearing the bottom, load more keys.
        if ((sh - top - h) <= (h * 2)) {
          browseActions.fetchKeysNext()
        }
      }
    }
  },

  renderRoot (props, children) {
    return <tbody {...props}>{children}</tbody>
  },

  renderItem (props, item) {
    return <ValuesRow matchRegExp={this.props.matchRegExp} {...props} {...item}/>
  },

  renderPlaceholder (props) {
    return <tr key={props.key}><td colSpan='2' {...props}></td></tr>
  },

  render () {
    return (
      <HotKeys handlers={this.getHotKeys()}>
        <div className='values-table'>
          <table>
            <thead>
              <tr>
                <th className='key' colSpan='3'>
                  <TextField
                    className='search'
                    hintText='key:*:pattern'
                    floatingLabelText='Search'
                    value={this.props.match}
                    onChange={this.onSearchChange}
                    fullWidth />
                </th>
              </tr>
            </thead>
            {this.props.loading ?
              <tbody>
                <LoadingRow/>
              </tbody>
            :/*else*/
              <ScrollList
                ref='scrollList'
                renderRoot={this.renderRoot}
                renderItem={this.renderItem}
                renderPlaceholder={this.renderPlaceholder}
                getItems={this.getItems}
                itemHeight={this.props.itemHeight}
                offset={this.props.offset}
                scrollHandler={this.onScroll} />
            }
          </table>
        </div>
      </HotKeys>
    )
  }
})

export default ValuesTable
