# Type

> 字段类型，最终将映射到 iview 的具体表单组件中

```jsx
<k-form :model="form" v-model="schema"/>
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.INPUT
        }]
      }
    }
  }
}
```

```jsx
<k-form :model="form" v-model="schema"/>
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: 'k-input'
        }]
      }
    }
  }
}
```

### 映射关系表

* `KForm.TYPE.AUTO_COMPLETE -> 'k-auto-complete' -> iview.AutoComplete`
* `KForm.TYPE.CASCADER -> 'k-cascader' -> iview.Cascader`
* `KForm.TYPE.CHECKBOX -> 'k-checkbox' -> iview.Checkbox`
* `KForm.TYPE.COLOR_PICKER -> 'k-color-picker' -> iview.ColorPicker`
* `KForm.TYPE.DATE_PICKER -> 'k-date-picker' -> iview.DatePicker`
* `KForm.TYPE.INPUT -> 'k-input' -> iview.Input`
* `KForm.TYPE.INPUT_NUMBER -> 'k-input-number' -> iview.InputNumber`
* `KForm.TYPE.RADIO -> 'k-radio' -> iview.Radio`
* `KForm.TYPE.RATE -> 'k-rate' -> iview.Rate`
* `KForm.TYPE.SELECT -> 'k-select' -> iview.Select`
* `KForm.TYPE.SLIDER -> 'k-slider' -> iview.Slider`
* `KForm.TYPE.SWITCH -> 'k-switch' -> iview.Switch`
* `KForm.TYPE.TEXT -> 'k-text' -> p`
* `KForm.TYPE.TIME_PICKER -> 'k-time-picker' -> iview.TimePicker`
* `KForm.TYPE.UPLOAD -> 'k-upload' -> KeepFe.Upload`
* `KForm.TYPE.WIDGET -> 'k-widget' -> 自定义组件`