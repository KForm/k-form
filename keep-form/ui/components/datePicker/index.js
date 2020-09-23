import { TYPE } from '../../../core/types'

export default {
  name: TYPE.DATEPICKER,
  inheritAttrs: false,
  render(h) {
    return (
      <DatePicker {...{ props: this.$attrs, on: this.$listeners}}></DatePicker>
    )
  }
}