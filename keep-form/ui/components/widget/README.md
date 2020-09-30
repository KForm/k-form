### widget 组件

k-form 支持自定义组件，当 iview 的组件无法满足需求时，可以指定组件类型为 widget 并插入你自己的组件。

#### 说明

在 component 属性中配置自己的组件，支持值类型组件以及函数类型组件，参数为 $createElement
仅 type、field、label、rules、layout 生效，你需要在自己的组件内绑定 v-model、属性、事件、ref、插槽等等。
form.editable 以及 field.editable 在该字段上均不生效，你可以在自己的组件中做逻辑处理。

```
[{
  type: KeepForm.TYPE.WIDGET,
  field: 'widget',
  label: '自定义组件',
  rules: { required: true },
  component: h => <input value = { this.form.widget } on-input = { e => {
    this.form.widget = e.target.value
    return
  }} />
}]

<keep-field 
  :value="form.name" 
  :type="KeepForm.TYPE.WIDGET" 
  field="widget" 
  label="自定义组件" 
  :component="h => h('input', {
    attrs: {
      value: form.widget
    },
    on: {
      input: e => form.widget = e.target.value
    }
  })"
/>
```