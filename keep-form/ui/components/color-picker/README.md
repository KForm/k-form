### ColorPicker 组件

#### 属性

支持 iview ColorPicker 组件的所有属性

#### 事件

支持 iview ColorPicker 组件的所有事件

#### 示例

```
[{
  type: KeepForm.TYPE.COLOR_PICKER,
  field: 'color',
  label: '颜色',
  ui: {
    recommend: true
  }
}]

<keep-field :value="form.color" type="k-color-picker" field="color" label="颜色" :ui="{ alpha: true }" />
```