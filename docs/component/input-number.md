# InputNumber

> iview.InputNumber 组件

### 类型

`KForm.TYPE.INPUT_NUMBER`

### 属性

支持 `iview.InputNumber` 的所有属性

### 事件

支持 `iview.InputNumber` 的所有事件

### 示例

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.INPUT_NUMBER,
          field: 'age',
          label: '年龄',
          ui: {
            step: 10,
            $on: {
              'on-change': e => console.log(e)
            }
          }
        }]
      }
    }
  }
}
```