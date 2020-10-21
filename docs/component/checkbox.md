# Checkbox

> iview.Checkbox 组件

### 类型

`KForm.TYPE.CHECKBOX`

### 属性

支持 `iview.CheckboxGroup` 的所有属性。`ui.$data` 中支持配置 `iview.Checkbox` 的 `id -> value`、`name -> label`、`disabled` 属性，并额外提供 `render` 属性用于渲染自定义 `iview.Checkbox` 内容。

注意 ⚠️

render 支持值渲染和函数渲染，需要注意的是，函数渲染若想操作 `vue.this`，请使用普通函数而非箭头函数，否则无法获取正确的 this，见下例。

### 事件

支持 `iview.CheckboxGroup` 的所有事件，不支持 `iview.Checkbox` 的事件

### 示例

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.CHECKBOX,
          field: 'favorite',
          label: '喜好',
          ui: {
            $data: [
              { id: 0, name: '苹果' },
              { id: 1, name: '香蕉', render: <span>我是香蕉</span> },
              // 这里的 this 将获取到 “葡萄”
              { id: 2, name: '葡萄', render: function() { return <span><Icon type = "md-home" /><span>{ this.name }</span></span>} }
              { id: 3, name: '菠萝', disabled: true }
            ]
            $on: {
              'on-change': e => console.log(e),
            }
          }
        }]
      }
    }
  }
}
```