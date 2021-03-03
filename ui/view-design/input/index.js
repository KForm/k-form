import { TYPE } from '../../../package/view-design/types'
import { Input } from 'view-design'
export default {
  name: TYPE.INPUT,
  inheritAttrs: false,
  render(h) {
    const { editable, field, slots, value, _formatter } = this.$attrs
    return (
      editable ? <Input {...{ props: this.$attrs, on: this.$listeners, ref: field}}>
        { Object.keys(slots).map(item => (
          <template slot = { slots[item].name } >
            { slots[item].render(h) }
          </template>
        )) }
      </Input> : <p>{ _formatter || value }</p>
    )
  }
}