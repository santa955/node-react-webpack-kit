import './reset.styl'
import './app.styl'
import React from 'react'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Splash from '../pages/splash'
import List from '../pages/list'
import Detail from '../pages/detail'

import Test from '../test'

// const Splash = Loadable({
//   loader: () => import(/* webpackChunkName: "splash" */ '../pages/splash'),
//   loading: () => null
// })

// const List = Loadable({
//   loader: () => import(/* webpackChunkName: "list" */ '../pages/list'),
//   loading: () => null
// })

// const Detail = Loadable({
//   loader: () => import(/* webpackChunkName: "detail" */ '../pages/detail'),
//   loading: () => null
// })

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