import home from './home'

let list = [home, {
  path: '/example',
  name: 'example',
  meta: {},
  component: () => import('_app/pages/example')
},
{
  path: '/switch',
  name: 'switch',
  meta: {},
  component: () => import('_app/pages/example/switch')
}]

export default list
