# Layout

> 表单字段独立布局，使用方法同 `schema.form.layout`

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
          layout: { span: '24' }
        }]
      }
    }
  }
}
```

field 布局的优先级高于 form 布局：

```jsx
<k-form :model="form" v-model="schema"/>
```

```js
export default {
  data() {
    return {
      schema: {
        form: {
          layout: {
            span: '12' // name 将遵循 12 栏布局方式
          }
        },
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'name',
          label: '姓名：',
        }, {
          type: KForm.TYPE.INPUT,
          field: 'age',
          label: '年龄：',
          layout: { span: '24' } // age 将遵循 24 栏布局方式
        }]
      }
    }
  }
}
```