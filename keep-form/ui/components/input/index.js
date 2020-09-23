import { TYPE } from '../../../core/types'

export default {
  name: TYPE.INPUT,
  inheritAttrs: false,
  render(h) {
    return (
      <Input {...{ props: this.$attrs, on: this.$listeners, ref: this.$attrs.field}}>
        { Object.keys(this.$attrs.slots).map(item => (
          <template slot = { this.$attrs.slots[item].name } >
            { this.$attrs.slots[item].render(h) }
          </template>
        )) }
      </Input>
    )
  }
}