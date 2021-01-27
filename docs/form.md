# Form 组件

> 动态表单的核心组件，支持 schema 配置渲染表单字段，完美兼容 `iview Form` 组件的所有属性。

### 引入

```js
import KForm from 'k-form'
export default {
  components: {
    KForm: KForm.Form
  }
}
```

### 属性

属性 | 说明 | 类型 | 默认值
----|-----|------|------
model | 同 iview.Form 的 model，用于绑定表单数据源 | Object | {}
value | 表单生成的配置项，详细配置见「Schema」一章 | Object | -
ui | iview.Form 组件属性配置 | Object | {}
rules | 表单全局校验配置，同 iview.Form.rules | Object | {}
layout | iview.Col 布局配置 | Object | { span: '12' }
editable | 表单全局是否可以编辑 | Boolean | true

### 示例

```jsx
<k-form :model="{ name: '' }" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        form: { ui: { labelPosition: 'left' }, layout: { span: '12' } },
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'name',
          label: '姓名：'
        }]
      }
    }
  }
}
```