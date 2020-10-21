# Radio

> iview.Radio 组件

### 类型

`KForm.TYPE.RADIO`

### 属性

支持 `iview.RadioGroup` 的所有属性。`ui.$data` 中支持配置 `iview.Radio` 的 `id -> value`、`name -> label`、`disabled` 属性

### 事件

支持 `iview.RadioGroup` 的所有事件，不支持 `iview.Radio` 的事件

### 示例

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.RADIO,
          field: 'sex',
          label: '性别',
          ui: {
            $data: [
              { id: 0, name: '女' },
              { id: 1, name: '男' },
              { id: 2, name: '其他', disabled: true }
            ]
            $on: {
              'on-change': e => console.log(e),
            }
          }
        }]
      }
    }
  }
}
```