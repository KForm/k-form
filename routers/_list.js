import home from './home'

let list = [home, {
  path: '/example',
  name: 'example',
  meta: {},
  component: () => import('_app/pages/example')
}]

export default list
