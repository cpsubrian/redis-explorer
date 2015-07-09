import React from 'react'
import autobind from 'autobind-decorator'
import hljs from 'highlight.js'

@autobind
class Highlight extends React.Component {

  static defaultProps = {
    innerHTML: false,
    className: ''
  }

  componentDidMount () {
    this.highlightCode()
  }

  componentDidUpdate () {
    this.highlightCode()
  }

  highlightCode () {
    let nodes = React.findDOMNode(this).querySelectorAll('pre code')
    if (nodes.length > 0) {
      for (let i = 0; i < nodes.length; i = i + 1) {
        hljs.highlightBlock(nodes[i])
      }
    }
  }

  render () {
    if (this.props.innerHTML) {
      return <div dangerouslySetInnerHTML={{__html: this.props.children}} className={this.props.className || null}></div>
    } else {
      return <pre><code className={this.props.className}>{this.props.children}</code></pre>
    }
  }
}

export default Highlight
