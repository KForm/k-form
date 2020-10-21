import { TYPE } from '../../../core/types'

export default {
  name: TYPE.TIMEPICKER,
  inheritAttrs: false,
  render(h) {
    const { value, editable } = this.$attrs
    return (
      editable ? <TimePicker {...{ props: this.$attrs, on: this.$listeners}}>
        { Object.keys(this.$attrs.slots).map(item => (
          <template slot = { this.$attrs.slots[item].name } >
            { this.$attrs.slots[item].render(h) }
          </template>
        )) }
      </TimePicker>:
      <p>{ value }</p>
    )
  }
}