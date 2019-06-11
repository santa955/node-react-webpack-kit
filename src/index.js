import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducer from './redux/reducer'
import App from './app'

const initState = window.__PRELOADED_STATE__ || {}
const store = createStore(rootReducer, initState, applyMiddleware(ReduxThunk))

// ReactDOM.hydrate(<App />, document.getElementById('root'))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}