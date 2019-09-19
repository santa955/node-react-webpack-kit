import React from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import ModalPortal from './modal-portal'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class Modal extends React.PureComponent {
  static defaultProps = {
    visible: false,
    width: 480,
    onOk: null,
    onCancel: null
  }

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    width: PropTypes.number,
    onOk: PropTypes.func,
    onCancel: PropTypes.func.isRequired
  }

  render() {
    let { visible, width, onCancel, children } = this.props

    return (
      <ModalPortal visible={visible}>
        <div className={cx('modal-mask')} onClick={onCancel}></div>
        <div className={cx('modal-wrapper')} style={{ width }}>
          {children}
        </div>
      </ModalPortal>
    )
  }
}