# DatePicker

> iview.DatePicker 组件

### 类型

`KForm.TYPE.DATE_PICKER`

### 属性

支持 `iview.DatePicker` 的所有属性

### 事件

支持 `iview.DatePicker` 的所有事件

### 插槽

支持 `iview.DatePicker` 的所有插槽

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
          type: KForm.TYPE.DATE_PICKER,
          field: 'date',
          label: '日期',
          ui: {
            type: 'date',
            confirm: true,
            placeholder: '请输入日期',
            open: '{{ open }}'
            $on: {
              'on-change': e => this.form.date = e,
              'on-clear': () => this.open = false,
              'on-ok': () => this.open = false
            },
            $slots: [{
              name: 'default',
              render: () => (
                <a href = 'javascript:void(0)' on-click = { () => this.open = !this.open } >
                  <Icon type = 'ios-clock-outline'></Icon>
                  <span>{ this.form.date === '' ? 'Select date' : this.form.date }</span>
                </a>
              )
            }]
          }
        }]
      }
    }
  }
}
```