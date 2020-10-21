# Label

> 同 `iview.FormItem` 的 label 的字段，用于显示表单字段的标题

```jsx
<k-form :model="form" v-model="schema"/>
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'name',
          label: '姓名：'
        }]
      }
    }
  }
}
```