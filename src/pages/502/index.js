import React from 'react'
import classNames from 'classnames/bind'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class InternalError extends React.Component {
  render() {
    return (
      <main className={cx('error-wrapper')}>
        <b>502</b>
        <p>Server Internal Error.</p>
      </main>
    )
  }
}