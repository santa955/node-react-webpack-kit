import React, { lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Loadable from '@components/hocs/loadable'
import DefaultLayout from '@components/hocs/default-layout'
import FallbackRoutes from './fallback'

const routes = [{
  path: '/',
  component: Loadable(lazy(() => import(/* webpackChunkName: 'home' */'@pages/home')))
}]

export default () => {
  return (
    <Switch>
      {FallbackRoutes.map((route, index) =>
        <Route
          exact
          key={index}
          path={route.path}
          component={Loadable(route.component)} />
      )}
      {routes.map((route, index) =>
        <DefaultLayout
          exact
          key={index}
          path={route.path}
          component={Loadable(route.component)} />
      )}
      <Redirect to='/404' />
    </Switch>
  )
}