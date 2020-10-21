### Select 组件

#### 属性

支持 iview Select 组件的所有属性

$data：
id -> Option.value
name -> Option.label
disabled -> Option.disabled
render -> 自定义 Option 的渲染内容，render 支持值渲染和函数渲染，需要注意的是，函数渲染若想操作 this，请使用普通函数而非箭头函数，否则无法获取正确的 this，见下例。
其他 Option 属性暂不支持

#### 事件

支持 iview Select 组件的所有事件

#### 插槽

支持 iview Select 组件的所有插槽

#### 方法

支持 iview Select 组件的所有方法
`this.$refs.form.$field('city').clearSingleSelect()`

#### 示例

```
[{
  type: KeepForm.TYPE.SELECT,
  field: 'city',
  label: '归属地',
  ui: {
    $data: [
      { id: 0, name: 'beijing' },
      { id: 1, name: 'tianjin', render: <span>天津</span> },
      // 这里的 this 将获取到“shanghai”
      { id: 2, name: 'shanghai', render: function() { return <span><Icon type="md-home"/><span>{ this.name }</span></span>} }
      { id: 3, name: 'guangzhou', disabled: true }
    ],
    $slots: [{
      name: 'prefix',
      render: h => <Icon type = {'md-home'} slot = {'prefix'} />
    }],
    $on: {
      'on-change': e => console.log(e),
    }
  }
}]
```

#### 分组

支持 iview Select 的 OptionGroup 功能，需要将 $data 的格式改为 Object，key 作为分组的名称

```
{
  $data: { city: [{ id: 0, name: 'beijing' }], country: [{ id: 10, name: 'china' }] }
}
```