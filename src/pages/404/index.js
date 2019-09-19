import React from 'react'
import classNames from 'classnames/bind'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class NotFound extends React.Component {
  render() {
    return (
      <main className={cx('not-found-wrapper')}>
        <b>404</b>
        <p>Page Not Found.</p>
      </main>
    )
  }
}