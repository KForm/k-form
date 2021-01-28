import { TYPE } from '../../../core/types'
import Kmoment from '../../../core/kmoment'

export default {
  name: TYPE.DATE_PICKER,
  inheritAttrs: false,
  computed:{
    format(){
      return (_d,_f)=>{
        if(!_d) return ''
        if(!_f) return _d
        return new Kmoment(_d).format(_f)
      }
    }
  },
  methods:{
    // 由于日期对象转换字符串会造成undefined，所以在组件内覆盖input事件，单独转换
    handleInput(e, format) {
      let v = e
      if(Object.prototype.toString.call(e) === '[object Date]') {
        v = this.format(e,format || 'yyyy-MM-dd')
      }
      this.$emit('input', v)
    }
  },
  render(h) {
    const { format, value, editable, _formatter } = this.$attrs
    return (
      editable ? <DatePicker {...{props: this.$attrs, on: this.$listeners}} onInput = { e => this.handleInput(e,format) } >
        { Object.keys(this.$attrs.slots).map(item => (
          <template slot = { this.$attrs.slots[item].name } >
            { this.$attrs.slots[item].render(h) }
          </template>
        )) }
      </DatePicker>:
      <p>{ _formatter || this.format(value, format)}</p>
    )
  }
}