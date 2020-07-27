/**
 * 404, 502等路由
 */
export default [{
  path: '/404',
  component: () => import(/* webpackChunkName: '404' */'@pages/404')
}, {
  path: '/502',
  component: () => import(/* webpackChunkName: '502' */'@pages/502')
}]