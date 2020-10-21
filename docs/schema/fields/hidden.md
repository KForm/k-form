# Hidden

> 是否隐藏该表单字段

```jsx
<k-form  :model="form" v-model="schema" />
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
          hidden: true
        }] 
      }
    }
  }
}
```