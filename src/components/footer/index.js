import React from 'react'
import classNames from 'classnames/bind'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default () => {
  return (
    <footer className={cx('footer')}>
      <div className={cx('footer-content')}>
        <p>2019 in Shanghai</p>
        <p>@ 2020 yandan66. All rights reserved.</p>
      </div>
    </footer>
  )
}