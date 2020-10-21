# Field

> 表单字段值在 model 中对应的 key，KForm 基于此配置完成双向数据绑定

```jsx
<k-form :model="form" v-model="schema"/>
```

```js
export default {
  data() {
    schema: {
      fields: [{
        type: KForm.TYPE.INPUT,
        field: 'name'
      }]
    }
  }
}
```