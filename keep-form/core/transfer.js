export const baseTransfer = (dict = [], id) => {
  return dict.filter(item => item.id === id)[0]
}

export const translateId2Name = (dict, id, multiple) => {
  if(multiple) {
    let ids = id || []
    return ids.map(item => translateId2Name(dict, item, false)).join('，')
  }
  else {
    let res = baseTransfer(dict, id)
    return res ? res.name : ''
  }
}

// select group 转换
export const translateId2NameByGroup = (dict, id, multiple) => {
  let dicts = []
  let group = Object.keys(dict)
  group.map(item => {
    dicts = [...dicts, ...dict[item]]
    return
  })
  return translateId2Name(dicts, id, multiple)
}