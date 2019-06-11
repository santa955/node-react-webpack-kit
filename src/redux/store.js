import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from './reducer'

const initState = window.__PRELOADED_STATE__ || {}

export default (preloadedState = initState) => {
  const store = createStore(rootReducer, preloadedState, applyMiddleware(ReduxThunk))
  return store
}
