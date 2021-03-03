import BaseForm from '../form'
import Field from '../../package/view-design/field'
import { mapSchemaRules2UI, deepClone, isObject, isArray, findIndexOfandCheck } from '../utils'
import { _schema, _editable, _layout } from '../config'

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
    },
    kf(){
      return new BaseForm()
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
    $field(field) {
      return this.$refs[field]
    },
    $ui(field) {
      return this.$field(field).$ui()
    },
    $form() {
      return this.$refs[this.kf.refName]
    },
    validate(callback){
      this.$form().validate(valid=>{
        callback(valid)
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
  }
}