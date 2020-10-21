# Switch

> iview.Switch 组件

### 类型

`KForm.TYPE.SWITCH`

### 属性

支持 `iview.Switch` 的所有属性

### 事件

支持 `iview.Switch` 的所有事件

### 插槽

支持 `iview.Switch` 的所有插槽

### 示例

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.SWITCH,
          field: 'switch',
          label: '是否禁用',
          ui: {
            size: 'large',
            $on: {
              'on-change': e => console.log(e)
            },
            $slots: [{
                name:'open',
                render: h => <span slot = 'open'>启用</span>
              }, {
                name:'close',
                render: h => <span slot = 'close'>禁用</span>
              }
            ]
          }
        }]
      }
    }
  }
}
```