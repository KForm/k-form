import home from './home'

let list = [home, {
  path: '/example',
  name: 'example',
  meta: {},
  component: () => import('_app/pages/example')
}, {
  path: '/auto-complete',
  name: 'auto-complete',
  meta: {},
  component: () => import('_app/pages/example/auto-complete')
},
{
  path: '/switch',
  name: 'switch',
  meta: {},
  component: () => import('_app/pages/example/switch')
}, {
  path: '/input-number',
  name: 'input-number',
  meta: {},
  component: () => import('_app/pages/example/input-number')
}, {
  path: '/rate',
  name: 'rate',
  meta: {},
  component: () => import('_app/pages/example/rate')
}, {
  path: '/color-picker',
  name: 'color-picker',
  meta: {},
  component: () => import('_app/pages/example/color-picker')
}, {
  path: '/widget',
  name: 'widget',
  meta: {},
  component: () => import('_app/pages/example/widget')
},{
  path: '/date-picker',
  name: 'date-picker',
  meta: {},
  component: () => import('_app/pages/example/date-picker')
}, {
  path: '/linkage',
  name: 'linkage',
  meta: {},
  component: () => import('_app/pages/example/linkage')
}, {
  path: '/linkage2',
  name: 'linkage2',
  meta: {},
  component: () => import('_app/pages/example/linkage2')
},
{
  path: '/demo',
  name: 'demo',
  meta: {},
  component: () => import('_app/pages/example/demo')
},
{
  path: '/complex-layout',
  name: 'complexLayout',
  meta: {},
  component: () => import('_app/pages/example/complex-layout')
}]

export default list
