import { TYPE } from '../../../package/view-design/types'
import { TimePicker } from 'view-design'

export default {
  name: 'k-' + TYPE.TIME_PICKER,
  inheritAttrs: false,
  render(h) {
    const { value, editable, _formatter } = this.$attrs
    return (
      editable ? <TimePicker {...{ props: this.$attrs, on: this.$listeners}}>
        { Object.keys(this.$attrs.slots).map(item => (
          <template slot = { this.$attrs.slots[item].name } >
            { this.$attrs.slots[item].render(h) }
          </template>
        )) }
      </TimePicker>:
      <p>{ _formatter || value }</p>
    )
  }
}