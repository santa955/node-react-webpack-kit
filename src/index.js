import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import getStore from '@redux/store'
import Routes from './routes'
import './reset.styl'
import './app.styl'

const store = getStore()

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}