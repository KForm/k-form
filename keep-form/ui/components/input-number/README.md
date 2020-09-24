### InputNumber 组件

#### 属性

支持 iview InputNumber 组件的所有属性

#### 事件

支持 iview InputNumber 组件的所有事件

#### 示例

```
[{
  type: KeepForm.TYPE.INPUT_NUMBER,
  field: 'age',
  label: '年龄',
  ui: {
    step: 10
  }
}]

<keep-field :value="form.age" type="k-input-number" field="age" label="年龄" :ui="{
  min: 50,
  $on: {
    'on-change': e => handleChange(e)
  }
}" />
```