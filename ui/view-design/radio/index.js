import { TYPE } from '../../../core/types'
import { translateId2Name } from '../../../core/transfer'

export default {
  name: TYPE.RADIO,
  inheritAttrs: false,
  render(h) {
    const { $data, value, editable, _formatter } = this.$attrs
    return (
      editable ? <RadioGroup {...{ props: this.$attrs, on: this.$listeners}} >
        { $data.map(item => <Radio key = { item.id } label = { item.id } disabled = { item.disabled } true-value = { 'Number' } false-value = { 'Number' }>{ item.name }</Radio>) }
      </RadioGroup> : <p>{ _formatter || translateId2Name($data, value) }</p>
    )
  }
}