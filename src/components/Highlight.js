import hljs from 'highlight.js'
import React from 'react'

const Highlight = React.createClass({

  getDefaultProps () {
    return {
      innerHTML: false,
      className: ''
    }
  },

  componentDidMount () {
    this.highlightCode()
  },

  componentDidUpdate () {
    this.highlightCode()
  },

  highlightCode () {
    let domNode = this.getDOMNode()
    let nodes = domNode.querySelectorAll('pre code')
    if (nodes.length > 0) {
      for (let i = 0; i < nodes.length; i = i + 1) {
        hljs.highlightBlock(nodes[i])
      }
    }
  },

  render () {
    if (this.props.innerHTML) {
      return <div dangerouslySetInnerHTML={{__html: this.props.children}} className={this.props.className || null}></div>
    } else {
      return <pre><code className={this.props.className}>{this.props.children}</code></pre>
    }
  }
})

export default Highlight
