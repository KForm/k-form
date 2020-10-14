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
    ui: { $data: [{ id: 0, name: 'c 不可用' }, { id: 1, name: 'c 可用' }] },
    hidden: '{{ form.a === 0 }}'
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
* `schema.fields.hidden`
* `schema.fields.layout/*`
* `schema.fields.label`
* `schema.fields.ui/*`

##### 联动范围

模板字符串目前支持 `String`、`Object`、`Array` 三种范围的联动，见下例：

```js
// 联动一个字符串
ui: {
  disabled: '{{ form.a === form.b }}'
}
```

```js
// 联动一个对象
ui: {
  $style: {
    width: "{{ form.a === form.b ? '100px' : '200px' }}",
    height: "{{ form.a === form.b ? '100px' : '200px' }}"
  }
}
```

```js
// 联动一个数组
ui: {
  $class: ["{{ form.a === form.b ? 'classA' : 'classB' }}', '{{ form.c === form.d ? 'classC' : 'classD' }}"]
}
```

##### 依赖注入

KForm 默认情况下会将 model 属性注入到模板中：

```jsx
<k-form :model="form" :schema="{
  fields: [{
    type: KForm.TYPE.INPUT,
    field: 'name',
    label: '姓名：',
    editable: '{{ form.age > 18 }}'
  }]
}" />
```

```js
export default {
  data() {
    return {
      form: {
        name: '',
        age: ''
      }
    }
  }
}
```

在上述例子中，form 将自动注入到模板字符串中作为其的作用域。也就是说，你可以在 `{{` `}}` 里面访问 form 的所有属性来完成联动。但在一些特殊场景下，我们可能还需要访问 `vue.$data` 的其他属性，甚至需要访问 `vue.computed` 和 `vue.methods` 来完成联动，这时候你需要手动将这些需要访问的内容注入到 KForm 中，见下例：