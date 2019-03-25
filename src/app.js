import ReactDOM from 'react-dom'
import React from 'react'
import Loadable from 'react-loadable'

const LogIn = Loadable({
  loader: () => import('./pages/login'),
  loading: () => null,
})

ReactDOM.render(
  <LogIn />,
  document.getElementById('root')
)