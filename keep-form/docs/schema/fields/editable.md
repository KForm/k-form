# Editable

> 表单字段模式，使用方法同 `schema.form.editable`

<k-form :model="form" :schema="{
  fields: [{
    type: KeepForm.TYPE.INPUT,
    field: 'name',
    label: '姓名：',
    editable: false
  }]
}" />

field 模式的优先级高于 form 模式：

```jsx
<k-form :model="form" :schema="{
  form: {
    editable: true
  },
  fields: [{
    type: KeepForm.TYPE.INPUT,
    field: 'name',
    label: '姓名：',
  }, {
    type: KeepForm.TYPE.INPUT,
    field: 'age',
    label: '年龄：',
    editable: false // age 将开启详情模式
  }]
}"/>
```