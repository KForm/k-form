# 优先级

当 k-form.props 与 schema.form 同时存在时，k-form 会将二者合并。当属性 key 重复时，优先取 schema.form 的配置

```jsx
<k-form :model="form" v-model="schema" :ui="{
  labelWidth: 200,
  labelPosition: 'right'
}" :rules="{
  name: {
    required: true,
    message: '请输入姓名'
  }
}" :editable="false">
```

```js
export default {
  data() {
    return {
      schema: {
        form: {
          ui: {
            labelWidth: 300
          },
          rules: {
            age: {
              required: true,
              message: '请输入年龄'
            }
          }
        }
      }
    }
  }
}
```

最终合并后的配置为：

```js
{
  ui: {
    labelWidth: 300,
    labelPosition: 'right'
  },
  rules: {
    name: {
      required: true,
      message: '请输入姓名'
    },
    age: {
      required: true,
      message: '请输入年龄'
    }
  },
  editable: false
}
```

注意 ⚠️：不建议采用 k-form.props 与 schame.form 共存的方式配置 k-form 表单