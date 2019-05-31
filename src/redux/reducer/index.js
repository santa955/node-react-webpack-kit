import { combineReducers } from 'redux'
import listReducer from './list'
import detailReducer from './detail'

const rootReducer = combineReducers({
  movies: listReducer,
  detail: detailReducer
})

export default rootReducer