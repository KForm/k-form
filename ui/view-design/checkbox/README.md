### Checkbox 组件

#### 属性

支持 iview CheckboxGroup 组件的所有属性

$data：
id -> Checkbox.value
name -> Checkbox.label
disabled -> Checkbox.disabled
render -> 自定义 checkbox 的渲染内容，render 支持值渲染和函数渲染，需要注意的是，函数渲染若想操作 this，请使用普通函数而非箭头函数，否则无法获取正确的 this，见下例。
其他 Checkbox 属性暂不支持

#### 事件

支持 iview CheckboxGroup 组件的所有事件

暂不支持 iview Checkbox 组件的事件

#### 示例

```
[{
  type: KeepForm.TYPE.CHECKBOX,
  field: 'favorite',
  label: '喜好',
  ui: {
    $data: [
      { id: 0, name: '苹果' },
      { id: 1, name: '香蕉', render: <span>我是香蕉</span> },
      // 这里的 this 将获取到“葡萄”
      { id: 2, name: '葡萄', render: function() { return <span><Icon type="md-home"/><span>{ this.name }</span></span>} }
      { id: 3, name: '菠萝', disabled: true }
    ]
    $on: {
      'on-change': e => console.log(e),
    }
  }
}]
```