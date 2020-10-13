# UI

> 表单字段组件的属性配置集合

### 属性

兼容 iview 任意表单组件的所有属性，以 `iview.Input` 为例：

```jsx
<k-form  :model="form" :schema="{
  fields: [{
    type: KForm.TYPE.INPUT,
    field: 'name',
    label: '姓名：',
    ui: { placeholder: '请输入姓名', size: 'large'  }
  }] 
}" />
```

等同于：

```jsx
<Input placeholder="请输入姓名" size="large" />
```

### 事件 $on

兼容 iview 任意表单组件的所有事件，以 `iview.Input` 为例：

```jsx
<k-form  :model="form" :schema="{
  fields: [{
    type: KForm.TYPE.INPUT,
    field: 'name',
    label: '姓名：',
    ui: { $on: { 'on-change': e => changeHandler(e) }  }
  }] 
}" />
```

等同于：

```jsx
<Input @on-change="changeHandler" />
```

### 插槽 $slots

兼容 iview 任意支持 solt 的表单组件的所有插槽，以 `iview.Input` 为例：

```jsx
<k-form  :model="form" :schema="{
  fields: [{
    type: KForm.TYPE.INPUT,
    field: 'name',
    label: '姓名：',
    ui: { $slots: [{ name: 'prefix', render: h => <Icon type = { 'md-home' } slot = { 'prefix' } /> }]  }
  }] 
}" />
```

等同于：

```jsx
<Input>
  <Icon type="md-home" />
</Input>
```

### 数据源 $data

> 以字典表的形式为 checkbox、radio、select 等组件配置数据源

以 `iview.Checkbox` 为例：

```jsx
<k-form :model="form" :schema="{
  fields: [{
    type: KForm.TYPE.CHECKBOX,
    field: 'favorite',
    label: '喜好：',
    ui: { $data: [{ name: '苹果', id: 1 }, { name: '香蕉', id: 2 }] }
  }] 
}" />
```

> 除了 name、id 外，$data 还支持其他配置，比如：disabled、render 等等，这些配置取决于组件的类型，请移步至各个组件文档中

### 隐藏表单字段 $hidden

> 该字段是否需要隐藏，支持 boolean 值和表达式

```jsx
<k-form  :model="form" :schema="{
  fields: [{
    type: KForm.TYPE.INPUT,
    field: 'name',
    label: '姓名：',
    ui: { $hidden: true  }
  }] 
}" />
```

```jsx
<k-form  :model="form" :schema="{
  fields: [{
    type: KForm.TYPE.INPUT,
    field: 'name',
    label: '姓名：'
  }, {
    type: KForm.TYPE.INPUT,
    field: 'age',
    label: '年龄：',
    ui: { $hidden: '{{ form.name.length > 5 }}' }
  }] 
}" />
```