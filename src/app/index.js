import './reset.styl'
import './app.styl'
import React from 'react'
import { Route } from 'react-router-dom'
import Loadable from '@loadable/component'

const Splash = Loadable( /* #__LOADABLE__ */() => import(/* webpackChunkName: "splash" */ '../pages/splash'))
const List = Loadable( /* #__LOADABLE__ */() => import(/* webpackChunkName: "list" */ '../pages/list'))
const Detail = Loadable( /* #__LOADABLE__ */() => import(/* webpackChunkName: "detail" */ '../pages/detail'))

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