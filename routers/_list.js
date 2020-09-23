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
}]

export default list
