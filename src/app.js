import ReactDOM from 'react-dom'
import React from 'react'
import Loadable from 'react-loadable'
import './reset.styl'
import './app.styl'

// const LogIn = Loadable({
//   loader: () => import(/* webpackChunkName: 'login' */'./pages/login'),
//   loading: () => null,
// })

const Home = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */'./pages/home'),
  loading: () => null,
})

const Article = Loadable({
  loader: () => import(/* webpackChunkName: 'article' */'./pages/article'),
  loading: () => null,
})

ReactDOM.render(
  <Article />,
  document.getElementById('root')
)