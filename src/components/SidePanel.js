import React from'react'
import KeyCode from'material-ui/lib/utils/key-code'
import StylePropable from'material-ui/lib/mixins/style-propable'
import AutoPrefix from'material-ui/lib/styles/auto-prefix'
import Transitions from'material-ui/lib/styles/transitions'
import WindowListenable from'material-ui/lib/mixins/window-listenable'
import Overlay from'material-ui/lib/overlay'
import Paper from'material-ui/lib/paper'

/**
 * Based on material-ui LeftNav component.
 */
const SidePanel = React.createClass({

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    docked: React.PropTypes.bool,
    onOpen: React.PropTypes.func,
    onClose: React.PropTypes.func,
    openRight: React.PropTypes.bool,
    width: React.PropTypes.number,
    style: React.PropTypes.object,
    children: React.PropTypes.node
  },

  windowListeners: {
    'keyup': '_onWindowKeyUp',
    'resize': '_onWindowResize'
  },

  getDefaultProps () {
    return {
      docked: true
    }
  },

  getInitialState () {
    return {
      open: this.props.docked,
      maybeSwiping: false,
      swiping: false
    }
  },

  componentDidMount () {
    this._enableSwipeHandling()
  },

  componentDidUpdate (prevProps, prevState) {
    this._enableSwipeHandling()
  },

  componentWillUnmount () {
    this._disableSwipeHandling()
  },

  toggle () {
    this.setState({ open: !this.state.open })
    return this
  },

  close () {
    this.setState({ open: false })
    if (this.props.onClose) this.props.onClose()
    return this
  },

  open () {
    this.setState({ open: true })
    if (this.props.onOpen) this.props.onOpen()
    return this
  },

  getThemePalette () {
    return this.context.muiTheme.palette
  },

  getTheme () {
    return this.context.muiTheme.component.leftNav
  },

  getWidth () {
    return this.props.width || this.getTheme().width
  },

  getStyles () {
    var x = this._getTranslateMultiplier() * (this.state.open ? 0 : this._getMaxTranslateX()) + 'px'
    var styles = {
      root: {
        height: '100%',
        width: this.getWidth(),
        position: 'fixed',
        zIndex: 10,
        left: 0,
        top: 0,
        transform: 'translate3d(' + x + ', 0, 0)',
        transition: !this.state.swiping && Transitions.easeOut(),
        backgroundColor: this.getTheme().color,
        overflow: 'hidden'
      },
      rootWhenOpenRight: {
        left: 'auto',
        right: '0'
      }
    }
    return styles
  },

  render () {
    var overlay

    var styles = this.getStyles()
    if (!this.props.docked) {
      overlay = (
        <Overlay
          ref='overlay'
          show={this.state.open}
          transitionEnabled={!this.state.swiping}
          onTouchTap={this._onOverlayTouchTap}/>
      )
    }

    return (
      <div className={this.props.className}>
        {overlay}
        <Paper
          ref='clickAwayableElement'
          className='side-panel'
          zDepth={2}
          rounded={false}
          transitionEnabled={!this.state.swiping}
          style={this.mergeAndPrefix(
            styles.root,
            this.props.openRight && styles.rootWhenOpenRight,
            this.props.style)}>
          {this.props.children}
        </Paper>
      </div>
    )
  },

  _onOverlayTouchTap () {
    this.close()
  },

  _onWindowKeyUp (e) {
    if (e.keyCode === KeyCode.ESC &&
        !this.props.docked &&
        this.state.open) {
      this.close()
    }
  },

  _onWindowResize (e) {
    this._updateMenuHeight()
  },

  _getMaxTranslateX () {
    return this.getWidth() + 10
  },

  _getTranslateMultiplier () {
    return this.props.openRight ? 1 : -1
  },

  _enableSwipeHandling () {
    if (this.state.open && !this.props.docked) {
      document.body.addEventListener('touchstart', this._onBodyTouchStart)
    } else {
      this._disableSwipeHandling()
    }
  },

  _disableSwipeHandling () {
    document.body.removeEventListener('touchstart', this._onBodyTouchStart)
  },

  _onBodyTouchStart (e) {
    var touchStartX = e.touches[0].pageX
    var touchStartY = e.touches[0].pageY
    this.setState({
      maybeSwiping: true,
      touchStartX: touchStartX,
      touchStartY: touchStartY
    })

    document.body.addEventListener('touchmove', this._onBodyTouchMove)
    document.body.addEventListener('touchend', this._onBodyTouchEnd)
    document.body.addEventListener('touchcancel', this._onBodyTouchEnd)
  },

  _onBodyTouchMove (e) {
    var currentX = e.touches[0].pageX
    var currentY = e.touches[0].pageY

    if (this.state.swiping) {
      e.preventDefault()
      var translateX = Math.min(
        Math.max(
          this._getTranslateMultiplier() * (currentX - this.state.swipeStartX),
          0
        ),
        this._getMaxTranslateX()
      )

      var leftNav = React.findDOMNode(this.refs.clickAwayableElement)
      leftNav.style[AutoPrefix.single('transform')] =
        'translate3d(' + (this._getTranslateMultiplier() * translateX) + 'px, 0, 0)'
      this.refs.overlay.setOpacity(1 - translateX / this._getMaxTranslateX())
    } else if (this.state.maybeSwiping) {
      var dXAbs = Math.abs(currentX - this.state.touchStartX)
      var dYAbs = Math.abs(currentY - this.state.touchStartY)
      // If the user has moved his thumb ten pixels in either direction,
      // we can safely make an assumption about whether he was intending
      // to swipe or scroll.
      var threshold = 10

      if (dXAbs > threshold && dYAbs <= threshold) {
        this.setState({
          swiping: true,
          swipeStartX: currentX
        })
      } else if (dXAbs <= threshold && dYAbs > threshold) {
        this._onBodyTouchEnd()
      }
    }
  },

  _onBodyTouchEnd () {
    var shouldClose = false

    if (this.state.swiping) shouldClose = true

    this.setState({
      maybeSwiping: false,
      swiping: false
    })

    // We have to call close() after setting swiping to false,
    // because only then CSS transition is enabled.
    if (shouldClose) this.close()

    document.body.removeEventListener('touchmove', this._onBodyTouchMove)
    document.body.removeEventListener('touchend', this._onBodyTouchEnd)
    document.body.removeEventListener('touchcancel', this._onBodyTouchEnd)
  }
})

export default SidePanel
