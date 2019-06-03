import './reset.styl'
import './app.styl'
import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import rootReducer from '../redux/reducer'
import Test from '../test'

export default Test

const Splash = Loadable({
  loader: () => import(/* webpackChunkName: "splash" */ '../pages/splash'),
  loading: () => null
})

const List = Loadable({
  loader: () => import(/* webpackChunkName: "list" */ '../pages/list'),
  loading: () => null
})

const Detail = Loadable({
  loader: () => import(/* webpackChunkName: "detail" */ '../pages/detail'),
  loading: () => null
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

// ReactDOM.render(
//   <Provider store={store}>
//     <Helmet>
//       <title>好时光 - 有好电影</title>
//     </Helmet>
//     <Router>
//       <Route exact path='/movies/:id' component={List} />
//       <Route exact path='/movie/:id' component={Detail} />
//       <Route exact path='/' component={Splash} />
//     </Router>
//   </Provider>,
//   document.getElementById('root')
// )
