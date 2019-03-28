import React from 'react'
import classNames from 'classnames/bind'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class Header extends React.PureComponent {
  render() {
    return (
      <header className={cx('header')}>
        <h1><a href='/'><img src='//ae01.alicdn.com/kf/HTB11y6FN4naK1RjSZFtq6zC2VXaf.jpg' alt='首页' /></a></h1>
        <nav className={cx('header-nav')}>
          <a className={cx('nav')} href='#'>文章</a>
          <a className={cx('nav')} href='#'>开源</a>
          <a className={cx('nav')} href='#'>关于</a>
          <a className={cx('nav')} href='#'>存档</a>
        </nav>
      </header>
    )
  }
}