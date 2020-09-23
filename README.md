## KeepForm 动态表单

基于 iview 实现的表单组件，支持布局、校验、配置化渲染等功能。

### Form 组件

#### 引入方式

```
import KeepForm from '_app/keep-form'
components: {
  KeepForm: KeepForm.Form
}
```

#### 属性

1. model
同 iview.Form 的 model，绑定数据源。必填，Object

`<keep-form :model="{ name: 'ee' }">`

2. schema
表单的详细配置项，详细配置见下表。必填，Object

#### Schema

##### 1. form
用于配置 iview.Form 的除 model、rules 外的全部属性，比如 labelWidth、inline、labelPosition 等。KeepForm 会自动收集 schema.fields 和 keepField 组件的校验规则自动生成完整表单 rules，不需要单独配置该属性。

`<keep-form :model="{ name: 'ee' }" :schema="{ form: { labelWidth: 200 } }">`

##### 2. fields
用于配置各个表单字段以生成表单组件。

2.1 type：表单组件的类型，支持 iview 的所有表单组件

2.2 field：表单字段值在 model 中对应的 key，KeepForm 基于此配置完成双向数据绑定

2.3 label：同 iview.FormItem 的 label

2.4 ui：表单组件的所有属性和事件配置项，见下

2.4.1 说明：KeepForm 会根据 type 渲染成最终的表单 ui 组件，这些 ui 组件自身的属性、事件、插槽等等全部配置均收集在 ui 里。

2.4.2 属性：以 input 为例

支持配置 iview.Input 的全部属性

```
<keep-form  :model="{ name: 'ee' }" :schema="{ fields: [{
  type: KeepForm.TYPE.INPUT,
  field: 'name',
  label: '姓名',
  ui: { placeholder: '请输入姓名', size: 'large'  }
}] }" />
```

2.4.3 事件：在 ui.$on 中配置事件，以 input 为例

支持配置 iview.Input 的全部事件

```
<keep-form  :model="{ name: 'ee' }" :schema="{ fields: [{
  type: KeepForm.TYPE.INPUT,
  field: 'name',
  label: '姓名',
  ui: { $on: { 'on-change': e => changeHandler(e) }  }
}] }" />
```

2.4.4 插槽：若组件自身包含插槽，可以在 ui.$slots 中配置，以 input 为例

支持配置 iview.Input 的全部插槽

```
<keep-form  :model="{ name: 'ee' }" :schema="{ fields: [{
  type: KeepForm.TYPE.INPUT,
  field: 'name',
  label: '姓名',
  ui: { $slots: [{ name: ‘prefix’, render: h => <Icon type={‘md-home’} slot={‘prefix'}> }] }
}] }" />
```

2.4.5 数据源：诸如 checkbox、radio、select 等需要字典表渲染的组件，在 ui.$data 中配置字典表

```
<keep-form :model="{ favorite: [] }" :schema="{ fields: [{
  type: KeepForm.TYPE.CHECKBOX,
  field: 'favorite',
  label: '喜好',
  ui: { $data: [{ name: '苹果', id: 1 }, { name: '香蕉', id: 2 }] }
}] }" />
```

除了 name、id 外，$data 还支持其他配置，比如：disabled、render 等等，这些配置取决于组件的类型，请移步至各个组件文档中

2.5 layout：表单整体布局。

KeepForm 最终渲染出来的组件形式为：

```
<Form>
  <Col>
    <FormItem>
      <Input/>
    </FormItem>
  </Col>
  <Col>
    <FormItem>
      <RadioGroup>
        <Radio/>
      </RadioGroup>
    </FormItem>
  </Col>
</Form>
```

Col 的属性在 layout 中完成配置，支持 Col 组件的全部属性

```
<keep-form :model="{ favorite: [] }" :schema="{ fields: [{
  type: KeepForm.TYPE.CHECKBOX,
  field: 'favorite',
  label: '喜好',
  layout: { span: '24' }
}] }" />
```

2.6 rules：该表单字段的校验规则，同 iview.FormItem 的 rules

```
<keep-form :model="{ favorite: [] }" :schema="{ fields: [{
  type: KeepForm.TYPE.CHECKBOX,
  field: 'favorite',
  label: '喜好',
  rules: { required: true, message: '请选择您的喜好' }
}] }" />
```

### Field 组件

除了利用 schema 的 fields 配置来渲染表单字段组件外，KeepForm 还支持以组件的形式渲染

#### 引入方式

```
import KeepForm from '_app/keep-form'
components: {
  KeepField: KeepForm.Field
}
```

#### 属性

与 KeepForm.schema.fields 的配置项完全相同。

注意：
* 需要额外添加 value 来绑定字段的值，否则无法实现双向数据绑定
* ui.$slots 不再生效，若想实现本功能可直接在组件内正常使用 slot，见下例

```
<keep-form :model="form">
  <keep-field :value="form.name" type="TYPE.INPUT" field="name" label="姓名"
    :ui="{ readonly: true, $on: { 'on-change': e => changeHandler(e) } }"
  >
    <Icon slot="prefix" type="md-home" />
  </keep-field>
</keep-form>

form: {
  name: 'ee'
}
```

### 获取 Ref 

有时候我们需要获取到 iview 组件的实例来完成一些操作，比如调用 iview.Input 的 focus 方法实现自动聚焦。
KeepForm 支持以下两种方式获取到 iview.Input 实例：

#### 在 Form 组件中获取实例

```
<keep-form ref="form" :model="{ name: 'ee' }" :schema="{ fields: [{
  type: KeepForm.TYPE.INPUT,
  field: 'name',
  label: '姓名'
}] }" />

mounted() {
  // this.$refs.form.$field('name') 获取到 iview.Input
  this.$refs.form.$field('name').focus()
}
```

#### 在 Field 组件中获取实例

```
<keep-form :model="form">
  <keep-field ref="name" :value="form.name" type="TYPE.INPUT" field="name" label="姓名" />
</keep-form>

mounted() {
  // this.$refs.name.$field 获取到 iview.Input
  this.$refs.name.$field().focus()
}
```

### 表单校验

```
<keep-form ref="form" :model="{ name: 'ee' }" :schema="{ fields: [{
  type: KeepForm.TYPE.INPUT,
  field: 'name',
  label: '姓名'
}] }" />

mounted() {
  setTimeout(() => {
    // this.$refs.form.$form() 获取到 iview.Form 实例
    this.$refs.form.$form().validate(valid => {
      console.log(valid)
    })
  }, 1000)
}
```