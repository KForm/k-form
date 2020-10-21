# ColorPicker

> iview.ColorPicker 组件

### 类型

`KForm.TYPE.COLOR_PICKER`

### 属性

支持 `iview.ColorPicker` 的所有属性

### 事件

支持 `iview.ColorPicker` 的所有事件

### 示例

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.COLOR_PICKER,
          field: 'color',
          label: '颜色',
          ui: {
            colors: ['#311B92', '#512DA8', '#673AB7', '#9575CD', '#D1C4E9'],
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