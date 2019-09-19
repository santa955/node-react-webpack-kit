import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from './reduce'

export default (preloadedState = {}) => {
  const store = createStore(rootReducer, preloadedState, applyMiddleware(ReduxThunk))
  return store
}