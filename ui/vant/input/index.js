
import { TYPE } from '../../../package/vant/types'
import { FormItem } from '@keepfe/plugin-vant-ui/lib/vant-ui.min.js'
import { Cell } from 'vant'
export default {
  name: 'k-' + TYPE.INPUT,
  inheritAttrs: false,
  render(h){
    const { editable, field, slots, value, type, label} = this.$attrs
    return (
      editable ? <FormItem {...{ props: this.$attrs, on: this.$listeners, ref: field}} k-type={ TYPE.INPUT } >
        { 
          type === TYPE.CUSTOM ? Object.keys(slots).map(item => (
            <template slot = { slots[item].name } >
              { slots[item].render(h) }
            </template>
          )) : null
        }
      </FormItem> : <Cell title={ label }>{ value }</Cell>
    )
  }
}