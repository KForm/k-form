### Slider 组件

#### 属性

支持 iview Slider 组件的所有属性

#### 事件

支持 iview Slider 组件的所有事件

#### 示例

```
[{
  type: KeepForm.TYPE.SLIDER,
  field: 'range',
  label: '范围',
  ui: {
    range: true
  }
}]

<keep-field :value="form.range" type="k-slider" field="range" label="范围" :ui="{
  'show-stops': true,
  $on: {
    'on-change': e => handleChange(e)
  }
}" />
```