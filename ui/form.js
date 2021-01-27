import BaseForm from '../core/form'
import Field from './field'
import { mapSchemaRules2UI, isNull, isBoolean, hasMatched, deepClone, isObject, isArray , isFunction, findIndexOfandCheck } from '../core/utils'
import { _schema, _editable, _layout } from '../core/config'
import './style/form.less'

let kf = new BaseForm()

const CARD_STYLE = 'display: table; width: 100%; margin-bottom: 15px;'

export default {
  components: {
    Field
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    value: { // schema 
      type: Object,
      default: () => _schema
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    ui: {
      type: Object,
      default: () => ({})
    },
    layout: {
      type: Object,
      default: () => _layout
    },
    editable: {
      type: Boolean,
      default: _editable
    },
  },
  computed: {
    formRules() {
      return mapSchemaRules2UI(this, this.schema.form, this.schema.fields)
    },
    schema() {
      return this.value
    }
  },
  provide() {
    return {
      formHanlder: (field, e, ref, groupName) => {
        if(groupName && ref.indexOf('-') > -1) {
          let index = ref.substring(ref.indexOf('-') + 1, ref.length)
          this.model[groupName][index][field] = e
        }
        else if(groupName && ref.indexOf('.') > -1) {
          this.model[groupName][field] = e
        }
        else {
          this.model[field] = e
          return
        }
      },
      $context: this.$parent,
      $inject: (this.schema.form || {}).inject,
      deleteField: this.deleteField,
      updateField: this.updateField
    }
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
    $field(field) {
      return this.$refs[field]
    },
    $iview(field) {
      return this.$field(field).$iview()
    },
    $form() {
      return this.$refs[kf.refName]
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
    },
    deleteField(index) {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          let fields = this.value.fields
          if(isArray(index)) {
            index.forEach((item,index) => {
              let resIndex = findIndexOfandCheck(item, fields, index)
              if(resIndex === undefined) return
              if(typeof resIndex === 'string') {
                let idx = resIndex.split('.')
                fields[idx[0]].fields.splice(idx[1], 1)
              }
              else {
                fields.splice(resIndex, 1)
              }
              
            })
          }
          else {
            let resIndex = findIndexOfandCheck(index, fields)
            if(resIndex === undefined) return
            if(typeof resIndex === 'string') {
              let idx = resIndex.split('.')
              fields[idx[0]].fields.splice(idx[1], 1)
            }
            else {
              fields.splice(resIndex, 1)
            }
          }
          this.changeFields(fields)
          resolve(fields)
        })
      })
    },
    insertField(info, index) {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          let insertItem = []
          if(isArray(info)) {
            insertItem = [...info]
          }
          else if (isObject(info)) {
            insertItem = [info]
          }
          else {
            console.error(`${info} 请插入Object或Array类型的数据`)
          }
          let fields = this.value.fields
          let resIndex = fields.length
          resIndex = findIndexOfandCheck(index, fields)
          if(resIndex === undefined) return
          if(typeof resIndex === 'string') {
            let idx = resIndex.split('.')
            fields[idx[0]].fields.splice(idx[1], 0, ...insertItem)
          }
          else {
            fields.splice(resIndex, 0, ...insertItem)
          }
          this.changeFields(fields)
          resolve(fields)
        })
      })
    },
    updateField(field, info) {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          let fields = this.refactorFields(field, info)
          this.changeFields(fields)
          resolve(fields)
        })
      })
    },
    updateForm(option) {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          let form = Object.assign(deepClone(this.value.form), option)
          this.$emit('input', { form, fields: this.value.fields })
          resolve(form)
        })
      })
    },
    changeFields(fields) {
      this.$emit('input', { form: this.value.form, fields: fields })
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