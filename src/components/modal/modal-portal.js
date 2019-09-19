import React from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

export default class ModalPortal extends React.PureComponent {
  static defaultProps = {
    visible: false,
    className: ''
  }

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    className: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.node = document.createElement('div')
  }

  componentDidMount() {
    this.checkIfVisible()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      this.checkIfVisible()
    }
  }

  componentWillUnmount() {
    this.node.remove()
  }

  checkIfVisible = () => {
    const { visible } = this.props
    if (visible) {
      document.body.appendChild(this.node)
    } else {
      this.node.remove()
    }
  }

  render() {
    const { children } = this.props
    return createPortal(children, this.node)
  }
}