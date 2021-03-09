# Type

> 字段类型，最终将映射到 iview 或 vant 的具体表单组件中

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
 iview
* `KForm.TYPE.AUTO_COMPLETE -> 'auto-complete' -> iview.AutoComplete`
* `KForm.TYPE.CASCADER -> 'cascader' -> iview.Cascader`
* `KForm.TYPE.CHECKBOX -> 'checkbox' -> iview.Checkbox`
* `KForm.TYPE.COLOR_PICKER -> 'color-picker' -> iview.ColorPicker`
* `KForm.TYPE.DATE_PICKER -> 'date-picker' -> iview.DatePicker`
* `KForm.TYPE.INPUT -> 'input' -> iview.Input`
* `KForm.TYPE.INPUT_NUMBER -> 'input-number' -> iview.InputNumber`
* `KForm.TYPE.RADIO -> 'radio' -> iview.Radio`
* `KForm.TYPE.RATE -> 'rate' -> iview.Rate`
* `KForm.TYPE.SELECT -> 'select' -> iview.Select`
* `KForm.TYPE.SLIDER -> 'slider' -> iview.Slider`
* `KForm.TYPE.SWITCH -> 'switch' -> iview.Switch`
* `KForm.TYPE.TEXT -> 'text' -> p`
* `KForm.TYPE.TIME_PICKER -> 'time-picker' -> iview.TimePicker`
* `KForm.TYPE.UPLOAD -> 'upload' -> KeepFe.Upload`
* `KForm.TYPE.WIDGET -> 'widget' -> 自定义组件`

Vant
* `KForm.TYPE.INPUT -> 'input' -> Vant.field`
* `KForm.TYPE.DATE_PICKER -> 'date-picker' -> Vant.DateTimePicker`
* `KForm.TYPE.TIME_PICKER -> 'time-picker' -> iview.DateTimePicker`
* `KForm.TYPE.UPLOAD -> 'upload' -> vant-ui.upload`
* `KForm.TYPE.SELECT -> 'select' -> vant.picker`
* `KForm.TYPE.RADIO -> 'radio' -> Vant.Radio`
* `KForm.TYPE.WIDGET -> 'widget' -> 自定义组件`