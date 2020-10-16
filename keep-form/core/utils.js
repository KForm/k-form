let id = 0
export const uniqueId = () => ++id

export const propsGenerator = (ctx, props) => {
  let slots = props.ui.slots || []
  Object.keys(ctx.$slots || {}).map(item => slots.push(h => ctx.$slots[item][0]))
  return { value: props.value, ...props.ui, slots }
}

export const iviewProps = (ctx, props) => {
  let wraps = {}
  props.map(item => {
    wraps[item] = ctx[item]
    return
  })
  return wraps
}

export const mapSchemaRules2UI = (ctx, schema) => {
  let rulesSet = {}
  schema.map(item => {
    item.rules && (rulesSet[item.field] = item.rules)
    return
  })
  let fields = ctx.$slots.default
  if(!fields || !fields.length) {
    fields = []
  }
  fields.map(item => {
    if (!item.componentOptions)return
    const { field, rules } = item.componentOptions.propsData
    rules && (rulesSet[field] = rules)
    return
  })
  return rulesSet
}

export const slotsWrap = (ctx, slots) => {
  return Object.keys(slots).map(item => ({
    name: item,
    render: () => ctx.$slots[item]
  }))
}
export const _moment = function () {

  return this
}
export const isNull = v => v === null || v === undefined

export const getTypeString = v => Object.prototype.toString.call(v)

export const isObject = v => getTypeString(v) === '[object Object]'

export const isFunction = v => getTypeString(v) === '[object Function]'

export const isArray = v => getTypeString(v) === '[object Array]'

export const isBoolean = v => typeof v === 'boolean'

export const isMultipleArr = v => isArray(v) ? v.every(e => isArray(e)) : false

export const regExpression = /{{(.*)}}/

export const hasMatched = expression => regExpression.exec(expression)

export const handleExpression = (context, inject, expression) => {
  if(!expression) {
    return
  }
  const matched = hasMatched(expression)
  if(matched) {
    const body = matched[1].trim()
    let scope  =[]
    for(let k in context) {
      if(inject.indexOf(k) > -1) {
        scope.push(k)
      }
    }
    /* eslint-disable */
    const func = new Function(...scope, `return ${body}`)
    return func(...scope.map(item => context[item]))
  }
}

export const expressionWrap = (form, inject, prop) => {
  if(hasMatched(prop)) {
    return handleExpression(form, inject, prop)
  }
  else {
    return prop
  }
}

export const propExpressionWrap = (form, inject, prop) => {
  if(isNull(prop)) {
    return undefined
  }
  if(typeof prop === 'string') {
    return expressionWrap(form, inject, prop)
  }
  if(isObject(prop)) {
    let _prop = {}
    Object.keys(prop).map(item => {
      _prop[item] = propExpressionWrap(form, inject, prop[item])
    })
    return _prop
  }
  if(isArray(prop)) {
    return prop.map(item => propExpressionWrap(form, inject, item))
  }
  return prop
}

export const deepClone = (obj) => {
  // 如果不是复杂数据类型,就直接返回一个一样的对象
  if(typeof obj !== 'object'){
    return obj
  }
  // 如果是,就递归调用
  let newObj = {}
  if(isObject(obj)){
    for (let key in obj) {
      newObj[key] = deepClone(obj[key])
    }
  }else if(isArray(obj)){
    newObj = obj.map(item =>{
      return deepClone(item)
    })
  }
  return newObj
}
export const findIndexOfandCheck = (index,_s,num = 0) =>{
  // num 为 index 的一个变量，n次遍历 - n ,避免因数组长度改变索引混乱
  if(!isArray(index)&& typeof index !== 'number' && typeof index !== 'string'){
    console.error(`${index} 请输入正确的表单项索引或field`)
    return
  }
  let _i
  if( typeof index === 'string'){
    let temp = _s.indexOf(_s.find(item =>item.field === index))
    if(temp > -1){
      _i = temp
    }else{
      console.error(`未找到 filed 为 ${index} 的表单项`)
      return
    }
  }
  if(typeof index === 'number') _i = index - num
  return _i
}