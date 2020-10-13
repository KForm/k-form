import { TYPE } from '../core/types'
import components from './components'
import { slotsWrap, handleExpression, propExpressionWrap, propsExpressionWrap} from '../core/utils'
import { _layout, _editable } from '../core/config'

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
      type: Boolean,
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
    $iview(){
      return this.$res[this.field].$res[`K-${this.field}`]
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
    return (
      !isHidden ? <i-col { ...{ props: propsExpressionWrap(this.$model, this.layout) } }>
        <form-item  label = { propExpressionWrap(this.$model, this.label) } prop = { this.field } /* rules = { propsExpressionWrap(this.$model, this.rules) } */ >
          { h(this.getFieldComponent(this.type), {
            attrs: {
              value: this.$props.value,
              slots: this.$props.ui.$slots || slotsWrap(this, this.$slots),
              ...propsExpressionWrap(this.$model, this.$props.ui),
              field: this.$props.field,
              editable: propExpressionWrap(this.$model, this.$props.editable),
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
        </form-item>
      </i-col> : null
    )
  }
}