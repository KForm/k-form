import { TYPE } from '../../package/vant/types'
import { FormItem } from '@keepfe/plugin-vant-ui/lib/vant-ui.min.js'
export default {
  methods:{
    componentRender(type,_props,_h){
      const { props,on } = _props
      const { editable, field, slots, value } = props
      return (
        editable ? <FormItem {...{ props: props, on: on, ref: field}} k-type={ type } >
          { 
            type === TYPE.CUSTOM ? Object.keys(slots).map(item => (
              <template slot = { slots[item].name } >
                { slots[item].render(_h) }
              </template>
            )) : null
          }
        </FormItem> : <p>{ value }</p>
      )
    }
  }
  
}