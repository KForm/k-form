import 'view-design/dist/styles/iview.css'
import iView from 'view-design'

let initFn = (Vue) => {
  // 应用初始化函数，调用时机为app的mounted之前，参数为Vue实例
  console.log('initfN ------ ')
  Vue.use(iView)
}

let initOptions = () => {
  // newVue 的扩展参数
  return {}
}

let beforeEach = function (to, from, next) {
  // 路由事件监听
  console.log('-->router: beforeEach')
  next()
}
let beforeResolve = function (to, from, next) {
  // 路由事件监听
  console.log('-->router: beforeResolve')
  next()
}
let afterEach = function (to, from) {
  // 路由事件监听
  console.log('-->router: afterEach')
}

export default {
  initFn,
  beforeEach,
  beforeResolve,
  afterEach,
  initOptions
}
