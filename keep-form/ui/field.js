import { TYPE } from '../core/types'
import components from './components'
import { slotsWrap, handleExpression, propExpressionWrap, propsExpressionWrap,isObject} from '../core/utils'
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
    $model: {
      type: [Object, Array]
    },
    component: {
    }
  },
  inject: ['formHanlder','deleteField','updateField'],
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
    const isHidden = handleExpression(this.$model, this.$props.ui ? this.$props.ui.$hidden : undefined)
    const {tooltip} = this.$props.ui
    console.log(tooltip)
    return (
      !isHidden ? <i-col { ...{ props: propsExpressionWrap(this.$model, this.layout) } } >
        <form-item  label = { propExpressionWrap(this.$model, this.label) } prop = { this.field } style="padding-right: 50px;position: relative;"/* rules = { propsExpressionWrap(this.$model, this.rules) } */ >
          { h(this.getFieldComponent(this.type), {
            attrs: {
              value: this.$props.value,
              slots: this.$props.ui.$slots || slotsWrap(this, this.$slots),
              ...propsExpressionWrap(this.$model, this.$props.ui),
              field: this.$props.field,
              editable: this.$props.editable,
              component: this.$props.component
              // $field: () => this.$field()
            },
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