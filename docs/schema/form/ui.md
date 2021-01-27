# UI

> 配置 iview.Form 的除 model、rules 外的全部属性，比如 labelWidth、inline、labelPosition 等。KForm 会自动收集 schema.fields 和 kField 组件的校验规则自动生成完整表单 rules，不需要单独配置该属性。


```jsx
<k-form :model="form" v-model="schema"/>
```

```js
export default {
  data() {
    return {
      schema: {
        form: {
          ui: {
            inline: true,
            labelPosition: 'left'
          }
        }
      }
    }
  }
}
```

### 组件形式

> k-form 支持将 ui 所有配置直接应用于组件属性中，这在编写「组件形式」上非常有用

```jsx
<k-form :model="form" inline label-position="left" />
```