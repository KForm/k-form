import { TYPE } from '../../../core/types'
import { isFunction } from '../../../core/utils'
import { translateId2Name } from '../../../core/transfer'

export default {
  name: TYPE.CHECKBOX,
  inheritAttrs: false,
  render(h) {
    const { $data, value, editable } = this.$attrs
    return (
      editable ? <CheckboxGroup {...{ props: this.$attrs, on: this.$listeners}} >
        { $data.map(item => <Checkbox key = { item.id } label = { item.id } disabled = { item.disabled }>{ item.render ? isFunction(item.render) ? item.render() : item.render : item.name }</Checkbox>) }
      </CheckboxGroup> : <p>{ translateId2Name($data, value, true) }</p>
    )
  }
}