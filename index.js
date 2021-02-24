import viewForm from './package/view-design/form'
import viewField from './package/view-design/field'
import vantForm from './package/vant/form'
import vantField from './package/vant/field'
import { TYPE } from './package/view-design/types'
import { isPC } from './core/utils'

const MAP = {
  'view-design': {
    Form:viewForm,
    Field:viewField,
    TYPE
  },
  'vant':{
    Form:vantForm,
    Field:vantField,
    TYPE
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