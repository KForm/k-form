### Input 组件

#### 属性

支持 iview Input 组件的所有属性

#### 事件

支持 iview Input 组件的所有事件

#### 插槽

支持 iview Input 组件的所有插槽

#### 方法

支持 ref 的形式调用方法，支持 iview Input 组件的所有方法
`this.$refs.form.$field('name').focus()`

#### 示例

```
[{
  type: KeepForm.TYPE.INPUT,
  field: 'name',
  label: '用户名',
  ui: {
    type: 'number',
    icon: 'ios-contact',
    $slots: [{
      name: 'prefix',
      render: h => <Icon type = {'md-home'} slot = {'prefix'} />
    }],
    $on: {
      'on-focus': () => console.log('im focus'),
    }
  }
}]

<KeepField 
  :value="form.name" 
  :type="KeepForm.TYPE.INPUT" 
  field="name" 
  label="用户名" 
  :ui="{ type: 'password', $on: { 'on-change': (e) => handler(e) } }"
>
  <Icon slot="prefix" type="md-home" />
</KeepField>
```