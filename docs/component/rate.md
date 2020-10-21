# Rate

> iview.Rate 组件

### 类型

`KForm.TYPE.RATE`

### 属性

支持 `iview.Rate` 的所有属性

### 事件

支持 `iview.Rate` 的所有事件

### 插槽

支持 `iview.Rate` 的所有插槽

### 示例

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.RATE,
          field: 'rate',
          label: '评分',
          ui: {
            showText: true,
            allowHalf: true,
            $slots: [{
              name: 'default',
              render: h => <span style = 'color: #f5a623;'>{ this.form.rate }</span>
            }]
          }
        }]
      }
    }
  }
}
```