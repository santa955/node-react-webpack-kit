import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { loadableReady } from '@loadable/component'
import { Provider } from 'react-redux'
import getStore from './redux/store'
import App from './app'

const store = getStore()
const use_ssr = process.env.USE_SSR
const render = use_ssr ? ReactDOM.hydrate : ReactDOM.render
const startApp = () => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )
}

if (use_ssr) {
  console.warn('已开启REACT SSR')
  loadableReady(() => startApp())
} else {
  startApp()
}

if (module.hot) {
  module.hot.accept()
}