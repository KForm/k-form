# Formatter

> Editable = false 模式下， 字段展示形式

在 `editable = false` 模式下，当 `k-form` 默认的组件展现形式不能满足你的时候，可以利用 formatter 属性自定义其展示内容，如下：

```jsx
<k-form :model="form" v-model="schema" />
```

```js
export default {
  data() {
    return {
      form: {
        name: 'Steve',
        age: 20
      },
      schema: {
        form: {
          inject: ['form']
        },
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'name',
          label: '姓名：',
          editable: false,
          formatter: 'Steve Job'
        }, {
          type: KForm.TYPE.INPUT,
          field: 'age',
          label: '年龄：',
          editable: false,
          formatter: "{{ form.age + '(' + form.age > 18 ? '成年' : '青少年' + ')' }}"
        }] 
      }
    }
  }
}
```