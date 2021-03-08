
import { TYPE } from '../../../package/vant/types'
import { FormItem } from '@keepfe/plugin-vant-ui/lib/vant-ui.min.js'
export default {
  name: 'k-' + TYPE.UPLOAD,
  inheritAttrs: false,
  render(h){
    const { editable, field, slots, type, $data,disabled} = this.$attrs
    // 未设置禁用 false  取  editable  false： disabed

    let _disabled = editable === undefined ?  disabled === undefined ? false : disabled : !editable
    return (
      <FormItem {...{ props: {...this.$attrs,disabled:_disabled}, on: this.$listeners, ref: field}} data={ $data } k-type={ TYPE.UPLOAD } >
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