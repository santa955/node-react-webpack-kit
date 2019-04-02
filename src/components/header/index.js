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
          <a href='/article' className={cx('nav')}>文章</a>
          <a href='https://www.github.com/yandan66' target='_blank' className={cx('nav')}>开源</a>
          <a href='/' className={cx('nav')}>关于</a>
          <a href='/' className={cx('nav')}>存档</a>
        </nav>
      </header>
    )
  }
}