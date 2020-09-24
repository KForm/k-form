import { TYPE } from '../../../core/types'
import { isFunction, isObject } from '../../../core/utils'
import { translateId2Name, translateId2NameByGroup } from '../../../core/transfer'
export default {
  name: TYPE.SELECT,
  inheritAttrs: false,
  methods: {
    renderOptions(option) {
      return <Option key = { option.id } value = { option.id } disabled = { option.disabled }>{ option.render ? isFunction(option.render) ? option.render() : option.render : option.name }</Option>
    }
  },
  render(h) {
    const { $data, value, editable, field, slots, multiple } = this.$attrs
    return (
      editable ? <Select {...{ props: this.$attrs, on: this.$listeners, ref: field}} >
        { isObject($data) ? 
          Object.keys($data).map(group => 
            <OptionGroup label = { group }>{ $data[group].map(option => this.renderOptions(option)) }</OptionGroup>
          ) :
          $data.map(option => this.renderOptions(option))
        }
        { Object.keys(slots).map(item => (
          <template slot = { slots[item].name } >
            { slots[item].render(h) }
          </template>
        )) }
      </Select> : <p>{ isObject($data) ? translateId2NameByGroup($data, value, multiple) : translateId2Name($data, value, multiple) }</p>
    )
  }
}