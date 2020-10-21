# Input

> iview.Input 组件

### 类型

`KForm.TYPE.INPUT`

### 属性

支持 `iview.Input` 的所有属性

### 事件

支持 `iview.Input` 的所有事件

### 插槽

支持 `iview.Input` 的所有插槽

### 方法

支持 `iview.Input` 的所有方法

### 示例

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'name',
          label: '姓名',
          ui: {
            placeholder: '请输入姓名',
            $on: {
              'on-change': e => console.log(e)
            },
            $slots: [{
              name: 'prefix',
              render: h => <Icon type = 'md-home' slot = 'prefix' />
            }]
          }
        }]
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.form.$iview('name').focus()
    }, 1000)
  }
}
```