import React from 'react'
import classNames from 'classnames/bind'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default () => {
  return (
    <nav className={cx('header')}>
      <div className={cx('header-content')}>
        <h1><a href='#'>@yandan66</a></h1>
      </div>
    </nav>
  )
}