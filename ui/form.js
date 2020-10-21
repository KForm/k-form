import BaseForm from '../core/form'
import Field from './field'
import { mapSchemaRules2UI, isBoolean, hasMatched, deepClone, isObject, isArray , isFunction, findIndexOfandCheck } from '../core/utils'
import {refName, _schema, _editable } from '../core/config'

let kf = new BaseForm(this)

const CARD_STYLE = 'overflow: hidden; margin-bottom: 15px;'

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
    refName: {
      type: String,
      default: kf.refName
    }
  },
  computed: {
    formRules() {
      return mapSchemaRules2UI(this, this.schema.fields)
    },
    schema() {
      return this.value
    }
  },
  provide() {
    return {
      formHanlder: (field, e,ref,groupName) => {
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
      $inject: this.schema.form.inject,
      deleteField: this.deleteField,
      updateField: this.updateField
    }
  },
  methods: {
    renderFooter(field, h) {
      if(!field || !field.ui) {
        return
      }
      let renderFooter = field.ui.$footer
      return renderFooter ? isFunction(renderFooter) ? renderFooter(h) : renderFooter : null
    },
    renderField(form, field, _h, refIndex, groupName) {
      return field.map((item, i) => {
        if(isObject(item) && (item.hasOwnProperty('children') || item.hasOwnProperty('fields'))) {
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
                    return item.children && <Card { ...{ props: item.children.ui } } style = { CARD_STYLE } >
                      <template slot="default">
                        { this.renderField(form,item.children.fields, _h, index, item.field) }
                      </template>
                      { item.children.ui.$slots && Object.keys(item.children.ui.$slots).map(csi => (
                        <template slot = { item.children.ui.$slots[csi].name } >
                          { item.children.ui.$slots[csi].render(_h, index) }
                        </template>
                        
                      )) }
                      { this.renderFooter(item.children, _h) }
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
                    { this.renderField(form,item.fields, _h, undefined, item.field) }
                  </template>
                </Card>
              }
              default:
                return
            }
          }else{
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
          return (
            <Field
              ref = { refName }
              refName = { refName }
              groupName = {groupName}
              type = { item.type }
              field = { item.field }
              label = { item.label }
              value = { this.model[item.field] }
              ui = { item.ui }
              layout = { item.layout || form.layout }
              rules = { item.rules }
              editable = { hasMatched(item.editable) ? item.editable : isBoolean(item.editable) ? item.editable : isBoolean(item.editable) ? form.editable : _editable }
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
      return this.$refs[refName]
    },
    refactorFields(field, info) {
      let fields = this.value.fields
      const refactorField = (field, item, info) => {
        let scope = field.split('.')
        if(scope.length > 1) {
          if(item.fields) {
            let name = scope[1]
            let rawIndex = item.fields.findIndex(v => v.field === name)
            item.fields[rawIndex] = { ...item.fields[rawIndex], ...info }
            return item
          }
          if(item.children) {
            let name = scope[1]
            let rawIndex = item.children.fields.findIndex(v => v.field === name)
            item.children.fields[rawIndex] = { ...item.children.fields[rawIndex], ...info }
          }
        }
        if(item.field === field) return Object.assign(item, info)
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
                let idx = resIndex.split('.');
                (fields[idx[0]].fields || fields[idx[0]].children.fields).splice(idx[1], 1)
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
              let idx = resIndex.split('.');
              (fields[idx[0]].fields || fields[idx[0]].children.fields).splice(idx[1], 1)
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
            let idx = resIndex.split('.');
            (fields[idx[0]].fields || fields[idx[0]].children.fields).splice(idx[1], 0, ...insertItem)
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
    return (
      <div class="form-wrap">
        <Form ref={ refName } { ...{ props: { model: this.model, rules: this.formRules, ...(this.schema.form ? this.schema.form.ui : {}) } } } >
          { this.renderField(this.schema.form || {}, this.schema.fields, h) }
          { this.$slots.default }
        </Form>
      </div>
    )
  }
}