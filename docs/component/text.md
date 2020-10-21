# Text

> p 标签

### 类型

`KForm.TYPE.TEXT`

### 示例

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.TEXT,
          field: 'readme',
          label: '说明'
        }]
      }
    }
  }
}
```