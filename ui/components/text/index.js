import { TYPE } from '../../../core/types'

export default {
  name: TYPE.TEXT,
  props: ['value'],
  render(h) {
    return h('p', {}, this.value)
  }
}