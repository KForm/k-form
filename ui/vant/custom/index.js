
import { TYPE } from '../../../package/vant/types'
import { FormItem } from '@keepfe/plugin-vant-ui/lib/vant-ui.min.js'
export default {
  name: TYPE.CUSTOM,
  inheritAttrs: false,
  render(h){
    const { field, slots, type, $data } = this.$attrs
    return (
      <FormItem {...{ props: this.$attrs, on: this.$listeners, ref: field}} data={ $data } k-type={ TYPE.CUSTOM } >
        { 
          type === TYPE.CUSTOM ? Object.keys(slots).map(item => (
            <template slot = { slots[item].name } >
              { slots[item].render(h) }
            </template>
          )) : null
        }
      </FormItem>
    )
  }
}