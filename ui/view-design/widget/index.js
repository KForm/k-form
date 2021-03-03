import { TYPE } from '../../../package/view-design/types'
import { isFunction } from '../../../core/utils'

export default {
  name: TYPE.WIDGET,
  inheritAttrs: false,
  render(h) {
    return isFunction(this.$attrs.component) ? this.$attrs.component(h) : this.$attrs.component
  }
}