import viewForm from './package/view-design/form'
import viewField from './package/view-design/field'
import vantForm from './package/vant/form'
import vantField from './package/vant/field'
import { TYPE as VIEW_TYPE } from './package/view-design/types'
import { TYPE as VANT_TYPE } from './package/vant/types'
import { isPC } from './core/utils'

const MAP = {
  'view-design': {
    lang:'view-design',
    Form:viewForm,
    Field:viewField,
    TYPE:VIEW_TYPE
  },
  'vant':{
    lang:'vant',
    Form:vantForm,
    Field:vantField,
    TYPE:VANT_TYPE
  }
}
export default class KForm {
  constructor(framework) {
    if(!framework){
      if(isPC()){
        this.toConstructorProps('view-design')
      }else{
        this.toConstructorProps('vant')
      }
    } else {
      const components = MAP[framework]
      if(!components) {
        console.error('请传入 view-design 或者 vant')
      }else{
        this.toConstructorProps(framework)
      }
    }
  }
  toConstructorProps(framework){
    Object.keys(MAP[framework]).forEach(key=>{
      this[key] = MAP[framework][key]
    })
  }
}