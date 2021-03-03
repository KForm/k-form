import extendsForm from '../../core/component/form'
import { Form } from '@keepfe/plugin-vant-ui/lib/vant-ui.min.js'
import Field from './field'
import { isNull, isBoolean, hasMatched,isObject,isArray,isFunction } from '../../core/utils'
import { _editable } from '../../core/config'
import './style/index.less'
import Kcard from './kcard'

export default {
  extends:extendsForm,
  methods:{
    renderFooter(field, h, uk = 'ui') {
      if(!field || !field[uk]) {
        return
      }
      let renderFooter = field[uk].$footer
      return renderFooter ? isFunction(renderFooter) ? renderFooter(h) : renderFooter : null
    },
    renderField(form, field, _h, refIndex, groupName, model) {
      return field.map((item, i) => {
        /**
         * form 渲染 filed 分为三种类型：card、object、list
         * card类型的model是扁平化的数据，数据项在同一级 eg. {name:'wangshuang',sex:'女'}
         * object的model是对象类型的数据。eg. { baseInfo:{name:'wangshuang',sex:'女'},score:{a:100,b:98}}
         * list 对应数组类型的数据。eg.{stroke:[{departure:'王府井',destination:'天安门'},{departure:'望京',destination:'鸟巢'}]}
         */

        if(isObject(item) && item.hasOwnProperty('fields')) {
          if(item.hasOwnProperty('type') && typeof item.type === 'string') {
            switch (item.type.toLowerCase()) {
              case 'array': {
                if(!isArray(this.model[item.field])) {
                  this.model[item.field] = []
                } 
                let props = item.ui || {}
                let { $slots } = props
                return <Kcard { ...{attrs: props}}>
                  {
                    $slots && $slots.map(csr => (
                      <template slot = { csr.name } >
                        { csr.render(_h) }
                      </template>
                    ))
                  }
                  { this.model[item.field].map((modelItem, index) => {
                    return item.subui && <Kcard {...{attrs:item.subui,slots:item.subui.$slots}}>
                      {
                        item.subui.$slots && Object.keys(item.subui.$slots).map(csi => (
                          <template slot = { item.subui.$slots[csi].name } >
                            { item.subui.$slots[csi].render(_h, index) }
                          </template>
                        ))
                      }
                      { this.renderField(form,item.fields, _h, index, item.field, this.model[item.field][index]) }
                      { this.renderFooter(item, _h, 'subui') }
                    </Kcard>
                  }) }
                  { this.renderFooter(item, _h) }
                </Kcard>
              }
              case 'object': {
                if(!isObject(this.model[item.field])) {
                  this.model[item.field] = {}
                }
                return  <Kcard { ...{ attrs: item.ui } }>
                  <template slot="default">
                    { this.renderField(form, item.fields, _h, undefined, item.field, this.model[item.field]) }
                  </template>
                </Kcard>
              }
              case 'card': {
                return <Kcard { ...{ attrs: item.ui } } >
                  <template slot="default">
                    { this.renderField(form, item.fields, _h, undefined, undefined, this.model) }
                  </template>
                </Kcard>
              }
              default:
                return
            }
          }
          else {
            console.error(item.field + 'need a type')
            return
          }
        }else {
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
  render(h){
    const { ui } = (this.schema.form || {})
    const nativeProps = {
      ...this.$props.ui,
      ...( ui || {} ),
      model: this.model,
      rules: this.formRules
    }
    return (
      <Form ref={ this.kf.refName } { ...{ props: nativeProps } } >
        { this.renderField(this.schema.form || {}, this.schema.fields || [], h, undefined, undefined, this.model) }
        { this.$slots.default }
      </Form>
    )
  }
}