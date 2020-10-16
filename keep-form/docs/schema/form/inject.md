# Inject

> 依赖注入，将模板表达式中需要使用的变量（如 data、computed、methods）注入进来

KForm 默认将 model 所绑定的值注入到模板中：

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
        age: 0
      }
    }
  }
}
```

在上述例子中，form 将自动注入到模板字符串中作为其的作用域。也就是说，你可以在 `{{` `}}` 里面访问 form 的所有属性来完成联动。但在一些特殊场景下，我们可能还需要访问 `vue.$data` 的其他属性，甚至需要访问 `vue.computed` 和 `vue.methods` 来完成联动，这时候你需要手动将这些需要访问的内容注入到 KForm 中。

### 注入 data 的其他属性

```jsx
<k-form :model="form" :schema="{
  form: {
    inject: ['age']
  },
  fields: [{
    type: KForm.TYPE.INPUT,
    field: 'name',
    label: '姓名：',
    editable: '{{ age > 18 }}'
  }]
}" />
```

```js
export default {
  data() {
    return {
      form: {
        name: ''
      },
      age: 0
    }
  }
}
```

### 注入计算属性

```jsx
<k-form :model="form" :schema="{
  form: {
    inject: ['nominalAge']
  },
  fields: [{
    type: KForm.TYPE.INPUT,
    field: 'name',
    label: '姓名：',
    editable: '{{ nominalAge > 18 }}'
  }]
}" />
```

```js
export default {
  data() {
    return {
      form: {
        name: ''
      },
      age: 0
    }
  },
  computed: {
    nominalAge() {
      return this.age + 1
    }
  }
}
```

### 注入方法

```jsx
<k-form :model="form" :schema="{
  form: {
    inject: ['svgAge']
  },
  fields: [{
    type: KForm.TYPE.INPUT,
    field: 'name',
    label: '姓名：',
    editable: '{{ svgAge() > 18 }}'
  }]
}" />
```

```js
export default {
  data() {
    return {
      form: {
        name: ''
      },
      age: 0
    }
  },
  computed: {
    nominalAge() {
      return this.age + 1
    }
  },
  methods: {
    svgAge() {
      return (this.age + this.nominalAge) / 2
    }
  }
}
```