import { TYPE } from '../../../core/types'

export default {
  name: TYPE.INPUT,
  inheritAttrs: false,
  methods:{
    $update(_name,_option){
      console.log(Object.prototype.toString.call(_name))

    }
  },
  render(h) {
    const { editable, field, slots, value } = this.$attrs
    return (
      editable ? <Input {...{ props: this.$attrs, on: this.$listeners, ref: field}}>
        { Object.keys(slots).map(item => (
          <template slot = { slots[item].name } >
            { slots[item].render(h) }
          </template>
        )) }
      </Input> : <p>{ value }</p>
    )
  }
}