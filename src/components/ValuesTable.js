import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import pureRender from 'pure-render-decorator'
import autobind from 'autobind-decorator'
import shell from 'shell'
import browseActions from '../actions/browseActions'

import {TextField} from 'material-ui'
import {HotKeys} from 'react-hotkeys'
import ScrollList from '../components/ScrollList'
import LoadingRow from '../components/LoadingRow'
import ValuesRow from '../components/ValuesRow'

@pureRender
@autobind
class ValuesTable extends React.Component {

  static propTypes = {
    keys: ImmutablePropTypes.orderedMap.isRequired,
    loading: React.PropTypes.bool,
    finished: React.PropTypes.bool,
    offset: React.PropTypes.number,
    itemHeight: React.PropTypes.number,
    match: React.PropTypes.string,
    matchRegExp: React.PropTypes.object,
    selectedIndex: React.PropTypes.number
  }

  static defaultProps = {
    loading: false,
    offset: 0,
    itemHeight: 30
  }

  componentDidUpdate (prevProps) {
    if (this.refs.scrollList &&
        (this.props.selectedIndex !== null) &&
        (prevProps.selectedIndex !== this.props.selectedIndex)) {
      this.refs.scrollList.ensureVisible(this.props.selectedIndex)
    }
  }

  getHotKeys () {
    return {
      down: (event) => {
        if ((this.props.selectedIndex !== null) && this.props.selectedIndex < (this.props.keys.size - 1)) {
          browseActions.toggleSelectedIndex(this.props.selectedIndex + 1)
        } else {
          shell.beep()
        }
      },
      up: (event) => {
        if ((this.props.selectedIndex !== null) && this.props.selectedIndex > 0) {
          browseActions.toggleSelectedIndex(this.props.selectedIndex - 1)
        } else {
          shell.beep()
        }
      },
      esc: (event) => {
        if (this.props.selectedIndex !== null) {
          browseActions.toggleSelected()
        } else {
          shell.beep()
        }
      }
    }
  }

  onSearchChange (e) {
    browseActions.setMatch(e.currentTarget.value)
  }

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
  }

  renderRoot (props, children) {
    return <tbody {...props}>{children}</tbody>
  }

  renderItem (props, item, index) {
    return <ValuesRow matchRegExp={this.props.matchRegExp} item={item} index={index} {...props}/>
  }

  renderPlaceholder (props) {
    return <tr key={props.key}><td colSpan='2' {...props}></td></tr>
  }

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
                items={this.props.keys}
                itemHeight={this.props.itemHeight}
                offset={this.props.offset}
                scrollHandler={this.onScroll} />
            }
          </table>
        </div>
      </HotKeys>
    )
  }
}

export default ValuesTable
