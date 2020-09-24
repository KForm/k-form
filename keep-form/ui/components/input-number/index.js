import { TYPE } from '../../../core/types'

export default {
  name: TYPE.INPUT_NUMBER,
  inheritAttrs: false,
  render(h) {
    const { editable, value } = this.$attrs
    return (
      editable ? <InputNumber {...{ props: this.$attrs, on: this.$listeners}}/> : <p>{ value }</p>
    )
  }
}