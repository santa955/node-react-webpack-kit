import React from 'react'
import { Route } from 'react-router-dom'
import Header from '@components/header'
import Footer from '@components/footer'
import classNames from 'classnames/bind'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default ({ component: Component, ...porps }) => {
  return (
    <div className={cx('app-wrapper')}>
      <Header />
      <main className={cx('main')}>
        <Route {...porps} render={matchProps => <Component {...matchProps} />} />
      </main>
      <Footer />
    </div>
  )
}