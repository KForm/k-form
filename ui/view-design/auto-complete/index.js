import { TYPE } from '../../../package/view-design/types'
import { AutoComplete } from 'view-design'

export default {
  name: `k-${TYPE.AUTO_COMPLETE}`,
  inheritAttrs: false,
  render(h) {
    const { editable, slots, value, _formatter } = this.$attrs
    return (
      editable ? <AutoComplete {...{ props: this.$attrs, on: this.$listeners }}>
        { Object.keys(slots).map(item => (
          <template slot = { slots[item].name } >
            { slots[item].render(h) }
          </template>
        )) }
      </AutoComplete> : <p>{ _formatter || value }</p>
    )
  }
}