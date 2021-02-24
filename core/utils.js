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

export const mapSchemaRules2UI = (ctx, form = {}, schema = []) => {
  let formRules = form.rules
  let rulesSet = {}
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
  schema.map(item => {
    item.rules && (rulesSet[item.field] = item.rules)
    return
  })
  return { ...ctx.$props.rules, ...formRules, ...rulesSet }
}

export const slotsWrap = (ctx, slots) => {
  return Object.keys(slots).map(item => ({
    name: item,
    render: () => ctx.$slots[item]
  }))
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
  if(typeof obj !== 'object') {
    return obj
  }
  // 如果是,就递归调用
  let newObj = {}
  if(isObject(obj)) {
    for (let key in obj) {
      newObj[key] = deepClone(obj[key])
    }
  }else if(isArray(obj)) {
    newObj = obj.map(item => {
      return deepClone(item)
    })
  }
  return newObj
}
export const findIndexOfandCheck = (index, fields, num = 0) => {
  // num 为 index 的一个变量，n次遍历 - n ,避免因数组长度改变索引混乱
  if(!isArray(index) && typeof index !== 'number' && typeof index !== 'string') {
    console.error(`${index} 请输入正确的表单项索引或field`)
    return
  }
  let resIndex
  if( typeof index === 'string') {
    let scope = index.split('.')
    let target = index
    let targetChildren = undefined
    if(scope.length > 1) {
      target = scope[0]
      targetChildren = scope[1]
    }
    else {
      target = scope[0]
    }
    let temp = undefined
    let childIndex = undefined
    for(let i = 0; i < fields.length; i++) {
      let item = fields[i]
      if(item.field === target) {
        temp = i
      }
      else if(item.type === 'card' && item.fields) {
        let childIndex = item.fields.findIndex(item => item.field === target)
        if(childIndex > -1) {
          return `${i}.${childIndex}`
        }
      }
    }
    if(temp !== undefined && childIndex !== undefined) {
      console.error(`未找到 field 为 ${index} 的表单项`)
      return
    }
    console.log(temp)
    // let temp = fields.findIndex(item => item.field === target)
    if(temp > -1) {
      resIndex = temp
      if(targetChildren !== undefined) {
        let childIndex = fields[resIndex].fields.findIndex(item => item.field === targetChildren)
        if(childIndex === -1) {
          console.error(`未找到 field 为 ${index} 的表单项`)
          return
        }
        return `${resIndex}.${childIndex}`
      }
    }
    else {
      console.error(`未找到 field 为 ${index} 的表单项`)
      return
    }
  }
  if(typeof index === 'number') resIndex = index - num
  return resIndex
}
// 判断是否为PC端
export const isPC = ()=> {  
  let userAgentInfo = navigator.userAgent
  let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  let flag = true
  for (let v = 0; v < Agents.length; v++) {  
    if (userAgentInfo.indexOf(Agents[v]) > 0) { 
      flag = false
      break
    }  
  }
  return flag 
}