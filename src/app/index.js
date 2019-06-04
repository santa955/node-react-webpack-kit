import './reset.styl'
import './app.styl'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'

// import Test from '../test'

// export default Test

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

const App = () => {
  return (
    <React.Fragment>
      <Route exact path='/movies/:id' component={List} />
      <Route exact path='/movie/:id' component={Detail} />
      <Route exact path='/' component={Splash} />
    </React.Fragment>
  )
}

export default App

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
