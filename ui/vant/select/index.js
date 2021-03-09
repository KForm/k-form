
import { TYPE } from '../../../package/vant/types'
import { FormItem } from '@keepfe/plugin-vant-ui/lib/vant-ui.min.js'
import { Cell } from 'vant'
import { translateId2Name } from '../../../core/transfer'
export default {
  name: 'k-' + TYPE.PICKER,
  inheritAttrs: false,
  render(h){
    const { editable, field, slots, value, type, $data, label, _formatter } = this.$attrs
    return (
      editable ? <FormItem {...{ props: this.$attrs, on: this.$listeners, ref: field}} data={ $data } k-type='picker' >
        { 
          type === TYPE.WIDGET ? Object.keys(slots).map(item => (
            <template slot = { slots[item].name } >
              { slots[item].render(h) }
            </template>
          )) : null
        }
      </FormItem> : <Cell title={ label }>{ _formatter || translateId2Name($data, value)  }</Cell>
    )
  }
}