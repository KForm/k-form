import { TYPE } from '../../../core/types'

export default {
  name: TYPE.AUTO_COMPLETE,
  inheritAttrs: false,
  render(h) {
    const { editable, slots, value, formatter } = this.$attrs
    return (
      editable ? <AutoComplete {...{ props: this.$attrs, on: this.$listeners }}>
        { Object.keys(slots).map(item => (
          <template slot = { slots[item].name } >
            { slots[item].render(h) }
          </template>
        )) }
      </AutoComplete> : <p>{ formatter || value }</p>
    )
  }
}