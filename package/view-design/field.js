import { Col, FormItem, Tooltip, Icon } from 'view-design'
import extendField from '../../core/component/field'
import { TYPE } from '../../package/view-design/types'
import components from '../../ui/view-design'
import { slotsWrap, propExpressionWrap, isObject } from '../../core/utils'
import './style/field.less'
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
  render(h) {
    const { $tooltip } = this.$props.ui
    const layout = propExpressionWrap(this.$context, this.$inject, this.layout || this.schema.form.layout)
    const gutter = layout.gutter ? {
      padding: `0 ${layout.gutter}px`
    } : {}
    return (
      !propExpressionWrap(this.$context, this.$inject, this.$props.hidden) ?
        <Col { ...{ props: layout } } >
          <FormItem label = { propExpressionWrap(this.$context, this.$inject, this.label) } prop = { this.field } style = { gutter } >
            { h(this.getFieldComponent(this.type), {
              attrs: {
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
            }) }
            <slot/>
            {
              isObject($tooltip) ?
                <Tooltip { ...{ props: { ...$tooltip } } } >
                  { $tooltip.$slots && Object.keys($tooltip.$slots).map(item => (
                    <template slot = { $tooltip.$slots[item].name } >
                      { $tooltip.$slots[item].render(h) }
                    </template>
                  )) }
                  <template slot="default">
                    <Icon type="md-information-circle" /> 
                  </template>
                </Tooltip> :
                typeof $tooltip === 'string' ?
                  <Tooltip content = { $tooltip } >
                    <Icon type="md-information-circle" />
                  </Tooltip> : null
            }
          </FormItem>
        </Col> : null
    )
  }
}