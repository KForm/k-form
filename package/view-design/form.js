import { Card, Form } from 'view-design'
import extendForm from '../../core/component/form'
import Field from './field'
import { isNull, isBoolean, hasMatched, isObject, isArray , isFunction } from '../../core/utils'
import { _editable } from '../../core/config'
import '../../index.less'
import '../../ui/view-design/style.less'
const CARD_STYLE = 'display: table; width: 100%; margin-bottom: 15px;'

export default {
  extends:extendForm,
  components: {
    Field
  },
  methods: {
    renderFooter(field, h, uk = 'ui') {
      if(!field || !field[uk]) {
        return
      }
      let renderFooter = field[uk].$footer
      return renderFooter ? isFunction(renderFooter) ? renderFooter(h) : renderFooter : null
    },
    renderField(form, field, _h, refIndex, groupName, model) {
      return field.map((item, i) => {
        if(isObject(item) && item.hasOwnProperty('fields')) {
          if(item.hasOwnProperty('type') && typeof item.type === 'string') {
            switch (item.type.toLowerCase()) {
              case 'array': {
                if(!isArray(this.model[item.field])) {
                  this.model[item.field] = []
                } 
                let props = item.ui || {}
                return <Card { ...{ props } } style = { CARD_STYLE } >
                  { props.$slots && Object.keys(props.$slots).map(si => (
                    <template slot = { props.$slots[si].name } >
                      { props.$slots[si].render(_h, i) }
                    </template>
                  )) }
                  { this.model[item.field].map((modelItem, index) => {
                    return item.subui && <Card { ...{ props: item.subui } } style = { CARD_STYLE } >
                      <template slot="default">
                        { this.renderField(form,item.fields, _h, index, item.field, this.model[item.field][index]) }
                      </template>
                      { item.subui.$slots && Object.keys(item.subui.$slots).map(csi => (
                        <template slot = { item.subui.$slots[csi].name } >
                          { item.subui.$slots[csi].render(_h, index) }
                        </template>
                        
                      )) }
                      { this.renderFooter(item, _h, 'subui') }
                    </Card>
                  }) }
                  { this.renderFooter(item, _h) }
                </Card>
              }
              case 'object': {
                if(!isObject(this.model[item.field])) {
                  this.model[item.field] = {}
                }
                return  <Card { ...{ props: item.ui } } style = { CARD_STYLE } >
                  <template slot="default">
                    { this.renderField(form, item.fields, _h, undefined, item.field, this.model[item.field]) }
                  </template>
                </Card>
              }
              case 'card': {
                return <Card { ...{ props: item.ui } } style = { CARD_STYLE } >
                  <template slot="default">
                    { this.renderField(form, item.fields, _h, undefined, undefined, this.model) }
                  </template>
                </Card>
              }
              default:
                return
            }
          }
          else {
            console.error(item.field + 'need a type')
            return
          }
        }
        else {
          let refName = item.field 
          if(groupName !== undefined) {
            if(refIndex !== undefined) {
              refName = `${groupName}.${item.field}-${refIndex}`
            }
            else {
              refName = `${groupName}.${item.field}`
            }
          }
          const { editable, layout } = this.$props
          return (
            <Field
              ref = { refName }
              refName = { refName }
              groupName = {groupName}
              type = { item.type }
              field = { item.field }
              label = { item.label }
              value = { model[item.field] }
              ui = { item.ui }
              layout = { item.layout || (!isNull(form.layout) ? form.layout : layout) }
              rules = { item.rules }
              editable = { hasMatched(item.editable) ? item.editable : isBoolean(item.editable) ? item.editable : isBoolean(form.editable) ? form.editable : isBoolean(editable) ? editable : _editable }
              formatter = { item.formatter }
              hidden = { item.hidden }
              component = { item.component }
            />
          )
        }
      })
    }
  },
  render(h) {
    const { ui } = (this.schema.form || {})
    const nativeProps = {
      ...this.$props.ui,
      ...( ui || {} ),
      model: this.model,
      rules: this.formRules
    }
    return (
      <div class="k-form">
        <Form ref={ this.kf.refName } { ...{ props: nativeProps } } >
          { this.renderField(this.schema.form || {}, this.schema.fields || [], h, undefined, undefined, this.model) }
          { this.$slots.default }
        </Form>
      </div>
    )
  }
}