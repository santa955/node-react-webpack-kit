import ReactDOM from 'react-dom'
import React from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Loadable from 'react-loadable'
import './reset.styl'
import './app.styl'
import { callExpression } from '@babel/types';

const Splash = Loadable({
  loader: () => import('./pages/splash'),
  loading: () => null,
})

const List = Loadable({
  loader: () => import('./pages/list'),
  loading: () => null,
})

const Detail = Loadable({
  loader: () => import('./pages/detail'),
  loading: () => null,
})

ReactDOM.render(
  <div className={callExpression('wrapper')}>
    <Helmet>
      <title>好时光 - 有好电影</title>
    </Helmet>
    <Router>
      <Route exact path='/movies/:id' component={List} />
      <Route exact path='/movie/:id' component={Detail} />
      <Route exact path='/' component={Splash} />
    </Router>
  </div>,
  document.getElementById('root')
)