import ReactDOM from 'react-dom'
import React from 'react'
import Loadable from 'react-loadable'
import './reset.styl'

// const LogIn = Loadable({
//   loader: () => import(/* webpackChunkName: 'login' */'./pages/login'),
//   loading: () => null,
// })

const Home = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */'./pages/home'),
  loading: () => null,
})

ReactDOM.render(
  <Home />,
  document.getElementById('root')
)