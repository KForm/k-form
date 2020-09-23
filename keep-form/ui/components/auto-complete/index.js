import { TYPE } from '../../../core/types'

export default {
  name: TYPE.AUTO_COMPLETE,
  inheritAttrs: false,
  render(h) {
    return (
      <AutoComplete {...{ props: this.$attrs, on: this.$listeners }}>
        { Object.keys(this.$attrs.slots).map(item => (
          <template slot = { this.$attrs.slots[item].name } >
            { this.$attrs.slots[item].render(h) }
          </template>
        )) }
      </AutoComplete>
    )
  }
}