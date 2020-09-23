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
  component: () => import('_app/pages/auto-complete')
},
{
  path: '/switch',
  name: 'switch',
  meta: {},
  component: () => import('_app/pages/example/switch')
}]

export default list
