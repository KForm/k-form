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
    const { field, rules } = item.componentOptions.propsData
    rules && (rulesSet[field] = rules)
    return
  })
  return rulesSet
}

export const slotsWrap = (ctx, slots) => {
  return Object.keys(slots).map(item => ({
    name: item,
    render: () => ctx.$slots[item][0]
  }))
}

export const isNull = v => v === null || v === undefined

export const getTypeString = v => Object.prototype.toString.call(v)

export const isObject = v => getTypeString(v) === '[object Object]'

export const isFunction = v => getTypeString(v) === '[object Function]'

export const isArray = v => getTypeString(v) === '[object Array]'

export const isMultipleArr = v => isArray(v) ? v.every(e => isArray(e)) : false