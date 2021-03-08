import { TYPE } from '../../../package/view-design/types'
import { isBoolean } from '../../../core/utils'
import { Switch } from 'view-design'

export default {
  name: 'k-' + TYPE.SWITCH,
  inheritAttrs: false,
  render(h) {
    const { editable, slots, value, _formatter } = this.$attrs
    return (
      editable ? <Switch {...{ props: this.$attrs, on: this.$listeners}}>
        { Object.keys(slots).map(item => (
          <template slot = { slots[item].name } >
            { slots[item].render(h) }
          </template>
        )) }
      </Switch> : <p>{ _formatter || (isBoolean(value) ? value ? '是' : '否' : '') }</p>
    )
  }
}