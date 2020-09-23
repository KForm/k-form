import { TYPE } from '../../../core/types'
import { isFunction, isObject } from '../../../core/utils'
export default {
  name: TYPE.SELECT,
  inheritAttrs: false,
  methods: {
    renderOptions(option) {
      return <Option key = { option.id } value = { option.id } disabled = { option.disabled }>{ option.render ? isFunction(option.render) ? option.render() : option.render : option.name }</Option>
    }
  },
  render(h) {
    return (
      <Select {...{ props: this.$attrs, on: this.$listeners, ref: this.$attrs.field}} >
        { isObject(this.$attrs.$data) ? 
          Object.keys(this.$attrs.$data).map(group => 
            <OptionGroup label = { group }>{ this.$attrs.$data[group].map(option => this.renderOptions(option)) }</OptionGroup>
          ) :
          this.$attrs.$data.map(option => this.renderOptions(option))
        }
        { Object.keys(this.$attrs.slots).map(item => (
          <template slot = { this.$attrs.slots[item].name } >
            { this.$attrs.slots[item].render(h) }
          </template>
        )) }
      </Select>
    )
  }
}