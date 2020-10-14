import BaseForm from '../core/form'
import Field from './field'
import { mapSchemaRules2UI, isBoolean, hasMatched, propExpressionWrap,deepClone,isObject, isArray ,findIndexOfandCheck} from '../core/utils'
import { refName, _schema, _editable } from '../core/config'
// import render from './render'

let kf = new BaseForm(this)

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
    schema(){
      return this.value
    }
  },
  provide() {
    return {
      formHanlder: (field, e) => {
        this.model[field] = e
        return
      },
      deleteField:this.deleteField,
      updateField:this.updateField
    }
  },
  methods: {
    renderField(form, field, index) {
      return (
        <Field
          ref = { field.field }
          type = { field.type }
          field = { field.field }
          label = { field.label }
          value = { this.model[field.field] }
          ui = { field.ui }
          layout = { field.layout || form.layout }
          rules = { field.rules }
          editable = { hasMatched(field.editable) ? propExpressionWrap(this.model, field.editable) : isBoolean(field.editable) ? field.editable : isBoolean(form.editable) ? form.editable : _editable }
          component = { field.component }
          $model = { this.model }
        />
      )
    },
    $field(field) {
      return this.$refs[this.schema.fields.filter(item => item.field === field)[0].field]
    },
    $iview(field){
      return this.$field(field).$iview()
    },
    $form() {
      return this.$refs[refName]
    },
    refactorFields(field,info){
      let _s = deepClone(this.value.fields)
      if(isObject(field)){
        return _s.map(item=>{
          let obj = {}
          for(let key in field){
            if(item.field === key) obj =  Object.assign(item,field[key])
            obj = item
          }
          return obj
        })
      }
      return _s.map(item=>{
        if(item.field === field) return Object.assign(item,info)
        return item
      })
    },
    deleteField(index){
      return new Promise((resolve, reject) => {
        this.$nextTick(()=>{
          let _s = deepClone(this.value.fields)
          if(isArray(index)){
            index.forEach((item,index)=>{
              let _i = findIndexOfandCheck(item,_s,index)
              if(_i === undefined) return
              _s.splice(_i,1)
            })
          }else {
            let _i = findIndexOfandCheck(index,_s)
            if(_i === undefined) return
            _s.splice(_i,1)
          }
          this.changeFields(_s)
          resolve(_s)
        })
      })
    },
    insertField(info,index){
      return new Promise((resolve, reject) => {
        this.$nextTick(()=>{
          let insertItem = []
          if(isArray(info)){
            insertItem = [...info]
          }else if (isObject(info)){
            insertItem = [info]
          }else {
            console.error(`${info} 请插入Object或Array类型的数据`)
          }
          let _s = deepClone(this.value.fields)
          let _i = _s.length
          _i = findIndexOfandCheck(index,_s)
          if(_i === undefined) return
          _s.splice(_i,0,...insertItem )
          this.changeFields(_s)
          resolve(_s)
        })
      })
    },
    updateField(field, info) {
      return new Promise((resolve, reject) => {
        this.$nextTick(()=>{
          let _s = this.refactorFields(field,info)
          this.changeFields(_s)
          resolve(_s)
        })
      })
    },
    updateForm(option){
      return new Promise((resolve, reject) => {
        this.$nextTick(()=>{
          let form = Object.assign(deepClone(this.value.form),option)
          console.log(form)
          this.$emit('input',{form:form,fields:this.value.fields})
          resolve(form)
        })
      })
    },
    changeFields(_s){
      this.$emit('input',{form:this.value.form,fields:_s})
    }
  },
  render(h) {
    return (
      <div class="form-wrap">
        <Form ref={ refName } { ...{ props: { model: this.model, rules: this.formRules, ...(this.schema.form ? this.schema.form.ui : {}) } } } on-change={ e => console.log(e) }>
          { this.schema.fields.map((item) => this.renderField(this.schema.form || {}, item)) }
          { this.$slots.default }
        </Form>
      </div>
    )
  }
}