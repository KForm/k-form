### Radio 组件

#### 属性

支持 iview RadioGroup 组件的所有属性

$data：id -> Radio.value | name -> Radio.label | disabled -> Radio.disabled，其他 Radio 属性暂不支持

#### 事件

支持 iview RadioGroup 组件的所有事件

暂不支持 iview Radio 组件的事件

#### 示例

```
[{
  type: KeepForm.TYPE.RADIO,
  field: 'sex',
  label: '性别',
  ui: {
    $data: [{ id: 0, name: '女' }, { id: 1, name: '男' }, { id: 2, name: '其他', disabled: true }]
    $on: {
      'on-change': e => console.log(e),
    }
  }
}]
```