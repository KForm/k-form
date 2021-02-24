import BaseForm from '../../core/form'
import extendForm from '../../core/component/form'
import Field from './field'
import { isNull, isBoolean, hasMatched, isObject, isArray , isFunction } from '../../core/utils'
import { _editable } from '../../core/config'
import '../../index.less'
import '../../ui/view-design/style.less'

let kf = new BaseForm()

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
    },
    refactorFields(field, info) {
      let fields = this.value.fields
      const refactorField = (field, item, info) => {
        switch(item.type) {
          case 'array':
          case 'object': {
            let scope = field.split('.')
            if(scope.length > 1) {
              if(item.fields) {
                let name = scope[1]
                let key = scope[0]
                if(key === item.field) {
                  let rawIndex = item.fields.findIndex(v => v.field === name)
                  item.fields[rawIndex] = { ...item.fields[rawIndex], ...info }
                  return item
                }
              }
            }
            break
          }
          case 'card': {
            if(item.fields) {
              let rawIndex = item.fields.findIndex(v => v.field === field)
              rawIndex > -1 && (item.fields[rawIndex] = { ...item.fields[rawIndex], ...info })
              return item
            }
            break
          }
          default: {
            if(item.field === field) return Object.assign(item, info)
          }
        }
        return item
      }
      if(isObject(field)) {
        return fields.map(item => {
          let obj = {}
          for(let key in field) {
            obj = refactorField(key, item, field[key])
          }
          return obj
        })
      }
      return fields.map(item => {
        let after = item
        after = refactorField(field, item, info)
        return after
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
        <Form ref={ kf.refName } { ...{ props: nativeProps } } >
          { this.renderField(this.schema.form || {}, this.schema.fields || [], h, undefined, undefined, this.model) }
          { this.$slots.default }
        </Form>
      </div>
    )
  }
}