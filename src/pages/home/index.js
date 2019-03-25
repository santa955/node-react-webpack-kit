import React from 'react'
import classNames from 'classnames/bind'
import styles from './styles.css'

const cx = classNames.bind(styles)

export default class Home extends React.Component {
  render() {
    return (
      <section className={cx('wrapper')}>
        <header className={cx('header')}>
          <h1> <a href='#'><img src='https://i.loli.net/2019/03/25/5c98f1e384bbf.jpg' alt='首页' /></a> </h1>
        </header>
        <main className={cx('main')}></main>
        <footer className={cx('footer')}></footer>
      </section>
    )
  }
}