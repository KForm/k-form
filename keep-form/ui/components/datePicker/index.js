import { TYPE } from '../../../core/types'
import Kmoment from '../../../core/kmoment'

export default {
  name: TYPE.DATEPICKER,
  inheritAttrs: false,
  computed:{
    format(){
      return (_d,_f)=>{
        if(!_d) return
        if(!_f) return _d
        return new Kmoment(_d).format(_f)
      }
    }
  },
  render(h) {
    console.log(this.$attrs.slots)
    const { valueFormat,value,editable} = this.$attrs
    return (
      editable ? <DatePicker {...{ props: this.$attrs, on: this.$listeners}}>
        { Object.keys(this.$attrs.slots).map(item => (
          <template slot = { this.$attrs.slots[item].name } >
            { this.$attrs.slots[item].render(h) }
          </template>
        )) }
      </DatePicker>:
      <p>{ this.format(value,valueFormat)}</p>
    )
  }
}