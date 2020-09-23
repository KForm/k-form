### AutoComplete 组件

#### 属性

支持 iview AutoComplete 组件的所有属性

#### 事件

支持 iview AutoComplete 组件的所有事件

#### 插槽

支持 iview AutoComplete 组件的所有插槽（自定义选项、完全自定义 Option，显示复杂的布局）


#### 示例

```
[{
  type: KeepForm.TYPE.AUTO_COMPLETE,
  field: 'name',
  label: '姓名',
  ui: {
    data: this.dataSource,
    'filter-method': this.filterMethod
  }
}]

<keep-field :value="form.name" type="k-auto-complete" field="name" label="姓名" :ui="{
  data: dataSource,
  $on: {
    'on-search': e => handleSearch(e)
  }
}">
  <Option v-for="item in dataSource" :key="item" :value="item" style="color: green;">{{ item }}</Option>
</keep-field>
```