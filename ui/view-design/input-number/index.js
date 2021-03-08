import { TYPE } from '../../../package/view-design/types'
import { InputNumber } from 'view-design'

export default {
  name: 'k-' + TYPE.INPUT_NUMBER,
  inheritAttrs: false,
  render(h) {
    const { editable, value, _formatter } = this.$attrs
    return (
      editable ? <InputNumber {...{ props: this.$attrs, on: this.$listeners}}/> : <p>{ _formatter || value }</p>
    )
  }
}