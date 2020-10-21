# TimePicker

> iview.TimePicker 组件

### 类型

`KForm.TYPE.TIME_PICKER`

### 属性

支持 `iview.TimePicker` 的所有属性

### 事件

支持 `iview.TimePicker` 的所有事件

### 插槽

支持 `iview.TimePicker` 的所有插槽

### 示例

```js
export default {
  data() {
    return {
      open: false,
      schema: {
        form: {
          inject: ['open']
        },
        fields: [{
          type: KForm.TYPE.TIMEPICKER,
          field: 'time',
          label: 'time',
          ui: {
            type: 'time',
            open: '{{ open }}',
            confirm: true,
            $on: [{
              'on-ok': (e) => this.open = false,
              'on-change': e => this.form.time = e,
              'on-clear': (e) => this.open = false
            }],
            $slots: [{
              name:'default',
              render: () => (
                <a href = 'javascript:void(0)' onClick = { this.handleOpen } >
                  <Icon type = 'ios-clock-outline' />
                  <template>{ this.form.time === '' ? 'select date' : this.form.time }</template>
                </a>
              )
            }],
          }
        }]
      }
    }
  }
}
```