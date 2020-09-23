import { TYPE } from '../core/types'
import components from './components'
import { slotsWrap } from '../core/utils'
import { _layout } from '../core/config'

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
      type: [String, Number, Array],
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
    }
  },
  inject: ['formHanlder'],
  methods: {
    getFieldComponent(type) {
      return components[type]
    },
    $field() {
      return this.$refs.fieldRef.$refs[this.field]
    }
  },
  render(h) {
    return (
      <i-col  { ...{ props: this.layout } }>
        <form-item label = { this.label } prop = { this.field } >
          { h(this.getFieldComponent(this.type), {
            attrs: {
              value: this.$props.value,
              slots: this.$props.ui.$slots || slotsWrap(this, this.$slots),
              ...this.$props.ui,
              field: this.field,
              // $field: () => this.$field()
            },
            on: {
              input: e => this.formHanlder(this.field, e),
              ...this.$props.ui.$on
            },
            ref: 'fieldRef'
          }) }
          <slot/>
        </form-item>
      </i-col>
    )
  }
}