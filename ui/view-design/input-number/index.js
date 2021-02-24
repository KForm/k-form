import { TYPE } from '../../../package/view-design/types'

export default {
  name: TYPE.INPUT_NUMBER,
  inheritAttrs: false,
  render(h) {
    const { editable, value, _formatter } = this.$attrs
    return (
      editable ? <InputNumber {...{ props: this.$attrs, on: this.$listeners}}/> : <p>{ _formatter || value }</p>
    )
  }
}