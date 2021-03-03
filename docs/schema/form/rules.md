# Rules

> 全局校验规则，使用方法同 `iview.FormItem.rules`


```jsx
<k-form :model="form" v-model="schema"/>
```

```js
export default {
  data() {
    return {
      schema: {
        form: {
          rules: {
            name: {
              required: true,
              message: '请输入姓名'
            }
          }
        }
      }
    }
  }
}
```

### 组件形式

> k-form 支持将 rules 直接应用于属性中

```jsx
<k-form :model="form" :rules="{ name: { required: true, message: '请输入姓名' } }" />
```

### 优先级

Field schema rules > Field 组件 rules > Form schema rules > Form 组件 rules