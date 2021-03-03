import extendField from '../../core/component/field'
import components from '../../ui/vant'
import { slotsWrap, propExpressionWrap } from '../../core/utils'
import { TYPE } from './types'
export default {
  extends:extendField,
  props: {
    type: {
      type: String,
      default: TYPE.TEXT
    }
  },
  methods:{
    getFieldComponent(type) {
      return components[type]
    }
  },
  render(h){
    return (
      h(this.getFieldComponent(this.type), {
        attrs: {
          label: propExpressionWrap(this.$context, this.$inject, this.label),
          type:this.type,
          prop:this.field,
          rules:this.$props.rules,
          value: this.$props.value,
          slots: this.$props.ui.$slots || slotsWrap(this, this.$slots),
          ...propExpressionWrap(this.$context, this.$inject, this.$props.ui),
          field: this.$props.field,
          editable: propExpressionWrap(this.$context, this.$inject, this.$props.editable),
          _formatter: propExpressionWrap(this.$context, this.$inject, this.$props.formatter),
          component: this.$props.component
        },
        style: propExpressionWrap(this.$context, this.$inject, this.$props.ui.$style),
        class: propExpressionWrap(this.$context, this.$inject, this.$props.ui.$class),
        on: {
          input: e => this.formHanlder(this.field, e, this.refName, this.groupName),
          ...this.$props.ui.$on
        },
        ref: `K-${this.field}`
      })
    )
  }
}