# 组件实例

有时候我们需要获取 KField 组件来调用一些 api 操作，甚至需要获取到更深层次的 iview 组件的实例，比如调用 `iview.Input` 的 focus 方法实现自动聚焦。


### 获取 KField 实例
 
> 获取到 k-field 实例以执行 api 操作等

#### 在 Form 组件中获取实例

```jsx
<k-form ref="form" :model="form" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'name',
          label: '姓名；'
        }] 
      }
    }
  }
  mounted() {
    // 获取到 k-field
    console.log(this.$refs.form.$field('name'))
  }
}
```

#### 在 KField 组件中获取实例

```jsx
<k-form :model="form">
  <k-field ref="name" :value="form.name" type="KForm.TYPE.INPUT" field="name" label="姓名：" />
</k-form>
```

```js
export default {
  mounted() {
    // 获取到 k-field
    console.log(this.$refs.name)
  }
}
```

### 获取 iview 组件实例

> 获取到 k-field 所包裹的实际 iview 组件以调用其方法

#### 在 Form 组件中获取实例

```jsx
<k-form ref="form" :model="form" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'name',
          label: '姓名；'
        }] 
      }
    }
  }
  mounted() {
    // 获取到 i-input
    this.$refs.form.$field('name').iview().focus()
    this.$refs.form.$iview('name').focus()
  }
}
```

#### 在 KField 组件中获取实例

```jsx
<k-form :model="form">
  <k-field ref="name" :value="form.name" type="KForm.TYPE.INPUT" field="name" label="姓名：" />
</k-form>
```

```js
export default {
  mounted() {
    // 获取到 i-input
    this.$refs.name.$iview().focus()
  }
}
```

### 在复杂布局中获取实例

#### 在 `type = object` 中获取实例

```jsx
<k-form ref="form" :model="{
  a: {
    a1: ''
  }
}" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          field: 'a',
          type: 'object',
          fields: [{
            type: KForm.TYPE.INPUT,
            field: 'a1',
            label: 'a1'
          }]
        }] 
      }
    }
  },
  mounted() {
    console.log(this.$refs.form.$field('a.a1'))
    this.$refs.form.$field('a.a1').iview().focus()
    this.$refs.form.$iview('a.a1').focus()
  }
}
```

#### 在 `type = array` 中获取实例

```jsx
<k-form ref="form" :model="{
  a: [{
    a1: '',
    a2: ''
  }, {
    a1: ''
  }]
}" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          field: 'a',
          type: 'array',
          fields: [{
            type: KForm.TYPE.INPUT,
            field: 'a1',
            label: 'a1'
          }]
        }] 
      }
    }
  },
  mounted() {
    // 获取列表中的第二组的 a1 字段
    console.log(this.$refs.form.$field('a.a1-1'))
    this.$refs.form.$field('a.a1-1').iview().focus()
    this.$refs.form.$iview('a.a1-1').focus()
  }
}
```

### 获取 iview.Form 组件实例

```jsx
<k-form ref="form" :model="form" v-model="schema" />
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
  },
  mounted() {
    setTimeout(() => {
      // this.$refs.form.$form() 获取到 iview.Form 实例
      this.$refs.form.$form().validate(valid => {
        console.log(valid)
      })
    }, 1000)
  }
}
```