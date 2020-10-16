import BaseForm from '../core/form'
import Field from './field'
import { mapSchemaRules2UI, isBoolean, hasMatched,deepClone,isObject, isArray ,findIndexOfandCheck} from '../core/utils'
import {refName, _schema, _editable } from '../core/config'
// import render from './render'

let kf = new BaseForm(this)

const injectModel = (context, model, modelList) => {
  if(!modelList) {
    return {
      form: model
    }
  }
  else if(isArray(modelList)) {
    let modelService = {}
    modelList.map(item => {
      modelService[item] = context[item]
      return
    })
    return { form: model, inject: modelService }
  }
  return {
    form: model
  }
}

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
      formHanlder: (field, e,ref,groupName) => {
        console.log(groupName,ref,ref.indexOf('-'),groupName !== undefined && ref.indexOf('-') > -1)

        if(groupName && ref.indexOf('-') > -1){
          let index = ref.substring(ref.indexOf('-')+1,ref.length)
          console.log(index)
          this.model[groupName][index][field] = e
        }else{
          this.model[field] = e
          return
        }
      },
      $context: this.$parent,
      $inject: this.schema.form.inject,
      $model: injectModel(this.$parent, this.model, this.schema.form.inject),
      deleteField:this.deleteField,
      updateField:this.updateField
    }
  },
  methods: {
    renderChildren(form,field,_h){
      let props = deepClone(field)
      delete props.children
      delete props.$slots
      return(
        <Row>
          <Card style="overflow: hidden;" ref={`group-${field.name}`}>
            {field.$slots && Object.keys(field.$slots).map(item => (
              <template  slot = { field.$slots[item].name } >
                { field.$slots[item].render(_h) }
              </template>
            ))}
            <template slot="default">
              <Row gutter={16}>
                {
                  isArray(field.children) && field.children.map(item=>{
                    if(isObject(item) && item.hasOwnProperty('children')){
                      return this.renderChildren(form,item,_h)
                    }else{
                      return <Col span="12">
                        {this.renderField(form,item,_h)}
                      </Col>
                    }
                  })
                }
              </Row>
            </template>
            {field.addAble && field.children.length && <slot name="addItem">
              <Button type="text" onClick={this.handleAddGroup(field)}>新增+</Button>
            </slot>}
          </Card>
        </Row>
      )
    },
    renderField(form, field,_h,refIndex,groupName) {
      return field.map((item,i)=>{
        if(isObject(item) && (item.hasOwnProperty('children') || item.hasOwnProperty('fields'))){
          if(item.hasOwnProperty('type') && typeof item.type === 'string'){
            switch (item.type.toLowerCase( )) {
              case 'array':{
                if(!isArray(this.model[item.field])){
                  this.model[item.field] = []
                } 
                let props = item.ui  || {}
                return <Card {...{props:props}} style="overflow: hidden;">
                  {props.$slots && Object.keys(props.$slots).map(si => (
                    <template  slot = { props.$slots[si].name } >
                      { props.$slots[si].render(_h,i) }
                    </template>
                  ))}
                  {this.model[item.field].map((modelItem,index)=>{
                    return item.children && <Card title={ item.children.ui.title + (index+1)} style="overflow: hidden;">
                      <template slot="default">
                        { console.log(item.field) }
                        {this.renderField(form,item.children.fields,_h,index,item.field)}
                      </template>
                      {item.children.ui.$slots && Object.keys(item.children.ui.$slots).map(csi => (
                        <template  slot = { item.children.ui.$slots[csi].name } >
                          { item.children.ui.$slots[csi].render(_h,index) }
                        </template>
                        
                      ))}
                    </Card>
                  })}
                </Card>
              }
              case 'object':{
                if(!isObject(this.model[item.field])){
                  this.model[item.field] = {}
                }
                return  <Card title={ item.ui.title} style="overflow: hidden;">
                  <template slot="default">
                    {this.renderField(form,item.fields)}
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
        }else{
          let refName = refIndex !== undefined ? item.field+'-'+refIndex : item.field 
          console.log(groupName)
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
      let list = this.schema.fields
      let $f = null
      field.indexOf('-') > -1 ?this.schema.fields.forEach(item=>{
        if(isObject(item) && item.hasOwnProperty('children')){
          list = item.children.fields
          let _field = field.substring(0,field.indexOf('-'))
          $f = this.$refs[list.filter(item => item.field === _field).length>0 ? field : null]
        }else if(isObject(item) && item.hasOwnProperty('fields')){
          list = item.fields
          $f = this.$refs[list.filter(item => item.field === field).length > 0 ? field :null]
        }
      }) : $f = this.$refs[list.filter(item => item.field === field).length > 0 ? field :null]
      return  $f
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
          {/* { this.schema.fields.map((item,index) =>{
            return isObject(item) && item.hasOwnProperty('children') ? 
              this.renderChildren(this.schema.form || {},item) :
              this.renderField(this.schema.form || {}, item)
          })
          } */}
          {this.renderField(this.schema.form || {}, this.schema.fields,h)}
          { this.$slots.default }
        </Form>
      </div>
    )
  }
}