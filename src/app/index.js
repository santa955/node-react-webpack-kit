import ReactDOM from 'react-dom'
import React from 'react'
import Loadable from 'react-loadable'
import classNames from 'classnames/bind'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './reset.styl'
import styles from './app.styl'

const cx = classNames.bind(styles)

const Header = Loadable({
  loader: () => import(/* webpackChunkName: 'header' */'../components/header'),
  loading: () => null,
})

const Footer = Loadable({
  loader: () => import(/* webpackChunkName: 'footer' */'../components/footer'),
  loading: () => null,
})

const Home = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */'../pages/home'),
  loading: () => null,
})

const Article = Loadable({
  loader: () => import(/* webpackChunkName: 'article' */'../pages/article'),
  loading: () => null,
})

const Detail = Loadable({
  loader: () => import(/* webpackChunkName: 'detail' */'../pages/detail'),
  loading: () => null,
})

export default class APP extends React.Component {
  render() {
    return (
      <section className={cx('wrapper')}>
        <Router>
          <Header />
          <Route exact path='/' component={Home} />
          <Route exact path='/article' component={Article} />
          <Route exact path='/article/(\w+)' component={Detail} />
          <Footer />
        </Router>
      </section>
    )
  }
}