import { lazy } from 'react'

/**
 * 404, 502等路由
 */
export default [{
  path: '/404',
  component: lazy(() => import(/* webpackChunkName: '404' */'@pages/404'))
}, {
  path: '/502',
  component: lazy(() => import(/* webpackChunkName: '502' */'@pages/502'))
}]