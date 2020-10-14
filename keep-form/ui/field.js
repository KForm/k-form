import { TYPE } from '../core/types'
import components from './components'
import { slotsWrap, propExpressionWrap, handleExpression, isObject} from '../core/utils'
import { _layout, _editable } from '../core/config'
import './style/field.less'

export default {
  props: {
    type: {
      type: String,
      default: TYPE.TEXT
    },
    field: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number, Array, Boolean, Date,Object],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    ui: {
      type: Object,
      default: () => ({})
    },
    layout: {
      type: Object,
      default: () => _layout
    },
    rules: {
      type: [Object, Array]
    },
    editable: {
      type: [Boolean, String],
      default: _editable
    },
    hidden: {
      type: [Boolean, String],
      default: false
    },
    component: {
    },
  },
  inject: ['$context', '$inject', 'formHanlder','deleteField','updateField'],
  methods: {
    getFieldComponent(type) {
      return components[type]
    },
    // renderTooltip(tooltip) {
    //   if(isObject(tooltip)){
    //     let { slots,content } = tooltip
    //     return (
    //       <Tooltip content="Here is the prompt text">
    //         { Object.keys(slots).map(item => (
    //           <template slot = { slots[item].name } >
    //             { slots[item].render(h) }
    //           </template>
    //         )) }
    //       </Tooltip>
    //     )
    //   }else if(typeof tooltip === 'string'){
    //     return (
    //       <Tooltip content="Here is the prompt text">
    //         <Icon type="md-information-circle" />
    //       </Tooltip>
    //     )
    //   }
    // },
    $iview(){
      return this.$refs[`K-${this.field}`]
    },
    delete(){
      return this.deleteField(this.field)
    },
    update(info){
      return this.updateField(this.field,info)
    }
  },
  render(h) {
    const {tooltip} = this.$props.ui
    return (
      !handleExpression(this.$context, this.$inject, this.$props.hidden) ? <i-col { ...{ props: propExpressionWrap(this.$context, this.$inject, this.layout) } }>
        <form-item label = { propExpressionWrap(this.$context, this.$inject, this.label) } prop = { this.field } >
          { h(this.getFieldComponent(this.type), {
            attrs: {
              value: this.$props.value,
              slots: this.$props.ui.$slots || slotsWrap(this, this.$slots),
              ...propExpressionWrap(this.$context, this.$inject, this.$props.ui),
              field: this.$props.field,
              editable: propExpressionWrap(this.$context, this.$inject, this.$props.editable),
              component: this.$props.component
              // $field: () => this.$field()
            },
            style: propExpressionWrap(this.$context, this.$inject, this.$props.ui.$style),
            class: propExpressionWrap(this.$context, this.$inject, this.$props.ui.$class),
            on: {
              input: e => this.formHanlder(this.field, e),
              ...this.$props.ui.$on
            },
            ref: `K-${this.field}`
          }) }
          <slot/>
          {
            isObject(tooltip)?
              <Tooltip {...{props:{...tooltip}}}>
                {tooltip.$slots && Object.keys(tooltip.$slots).map(item => (
                  <template slot = { tooltip.$slots[item].name } >
                    { tooltip.$slots[item].render(h) }
                  </template>
                ))}
                <template slot="default">
                  <Icon type="md-information-circle" /> 
                </template>
              </Tooltip>:
              typeof tooltip === 'string' ?
                <Tooltip content={tooltip}>
                  <Icon type="md-information-circle" />
                </Tooltip>:null
          }
        </form-item>
      </i-col> : null
    )
  }
}