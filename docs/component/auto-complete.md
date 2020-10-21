# AutoComplete

> iview.AutoComplete 组件

### 类型

`KForm.TYPE.AUTO_COMPLETE`

### 属性

支持 `iview.AutoComplete` 的所有属性

### 事件

支持 `iview.AutoComplete` 的所有事件

### 示例

```js
export default {
  data() {
    return {
      schema: {
        form: {
          inject: ['data']
        },
        fields: [{
          type: KForm.TYPE.AUTO_COMPLETE,
          field: 'name',
          label: '姓名',
          ui: {
            data: '{{ data }}',
            placeholder: '请输入姓名',
            $on: {
              'on-search': e => this.data = !e ? [] : [e, e + e, e + e + e]
            }
          }
        }]
      }
    }
  }
}
```