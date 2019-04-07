import ReactDOM from 'react-dom'
import React from 'react'
import Loadable from 'react-loadable'
import './reset.styl'
import './app.styl'

const List = Loadable({
  loader: () => import('./pages/list'),
  loading: () => null,
})

const Detail = Loadable({
  loader: () => import('./pages/detail'),
  loading: () => null,
})

ReactDOM.render(
  <Detail />,
  document.getElementById('root')
)