import { TYPE } from '../../../core/types'
import { isBoolean } from '../../../core/utils'

export default {
  name: TYPE.SWITCH,
  inheritAttrs: false,
  render(h) {
    const { editable, slots, value } = this.$attrs
    return (
      editable ? <i-switch {...{ props: this.$attrs, on: this.$listeners}}>
        { Object.keys(slots).map(item => (
          <template slot = { slots[item].name } >
            { slots[item].render(h) }
          </template>
        )) }
      </i-switch> : <p>{ isBoolean(value) ? value ? '是' : '否' : '' }</p>
    )
  }
}