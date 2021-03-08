import { TYPE } from '../../../package/view-design/types'
import { Cascader } from 'view-design'
export default {
  name: 'k-' + TYPE.CASCADER,
  inheritAttrs: false,
  computed: {
    filterData() {
      return this.$attrs.data.filter(item => item.value === this.$attrs.value[0])[0]
    },
    findValue() {
      return this.$attrs.value.join(',')
    }
  },
  methods: {
    transferChildrenLabel(data) {
      return data.children.map(item => {
        if(this.findValue.indexOf(item.value) > -1) {
          return item.label
        }
        if(item.hasOwnProperty('children')) {
          return this.transferChildrenLabel(item.children)
        }
        return
      })
    },
    findResult(arr, value) {
      let result = []
      if(value.length) {
        let obj = arr.find(obj => obj.value === value[0])
        result.push(obj.label)
        value.splice(0, 1)
        result =[...result, ...this.findResult(obj.children,value)]
      }
      return result
    }
  },

  render(h) {
    const { data, editable, field, _formatter } = this.$attrs
    return (
      editable ?
        <Cascader {...{ props: this.$attrs, on: this.$listeners, ref: field}} /> : 
        <p>{ _formatter || this.findResult(data, JSON.parse(JSON.stringify(this.$attrs.value))).join(' / ') }</p>
    )
  }
}