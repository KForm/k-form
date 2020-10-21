# Slider

> iview.Slider 组件

### 类型

`KForm.TYPE.SLIDER`

### 属性

支持 `iview.Slider` 的所有属性

### 事件

支持 `iview.Slider` 的所有事件

### 示例

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.SLIDER,
          field: 'range',
          label: '范围',
          ui: {
            range: true,
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