import { TYPE } from '../../../package/view-design/types'

export default {
  name: TYPE.TEXT,
  props: ['value'],
  render(h) {
    return h('p', {}, this.value)
  }
}