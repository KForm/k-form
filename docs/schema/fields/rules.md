# Rules

> 为字段配置校验规则，使用方法同 `iview.FormItem.rules`

```jsx
<k-form :model="form" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'name',
          label: '姓名：',
          rules: {
            required: true,
            message: '请输入姓名'
          }
        }]
      }
    }
  }
}
```