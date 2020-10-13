# 表单联动

> KForm 支持众多场景下的表单联动

### 字段关联

字段 a 与 字段 b 相关联，字段 b 与 字段 c 相关联。比如 b 的显隐与取决于 a 的值，c 的 属性值取决于 b 的值

#### 模板字符串

利用 KForm 的模板字符串特性实现联动

```jsx
<k-form :model="form" :schema="{
  fields: [{
    type: KForm.TYPE.SELECT,
    field: 'a',
    label: 'a',
    ui: { $data: [{ id: 0, name: 'b 隐藏' }, { id: 1, name: 'b 显示' }] }
  }, {
    type: KForm.TYPE.RADIO,
    field: 'b',
    label: 'b',
    ui: { $data: [{ id: 0, name: 'c 不可用' }, { id: 1, name: 'c 可用' }], $hidden: '{{ form.a === 0 }}' }
  }, {
    type: KForm.TYPE.INPUT,
    field: 'c',
    label: 'c',
    ui: { disabled: '{{ form.b === 0 }}' }
  }]
}" />
```

##### 支持模板字符串的属性

* `schema.fields.editable`
* `schema.fields.layout/*`
* `schema.fields.label`
* `schema.fields.ui/*`
