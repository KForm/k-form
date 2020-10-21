# Editable

> 表单字段模式，使用方法同 `schema.form.editable`

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
          editable: false
        }]
      }
    }
  }
}
```

field 模式的优先级高于 form 模式：

```jsx
<k-form :model="form" v-model="schema"/>
```

```js
export default {
  data() {
    return {
      schema: {
        form: {
          editable: true
        },
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'name',
          label: '姓名：',
        }, {
          type: KForm.TYPE.INPUT,
          field: 'age',
          label: '年龄：',
          editable: false // age 将开启详情模式
        }]
      }
    }
  }
}
```