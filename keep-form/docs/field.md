# Field 组件

> 除了利用 schema 的 fields 来配置表单字段组件外，KForm 还支持以组件的形式渲染表单字段

### 引入

```js
import KForm from 'k-form'
export default {
  components: {
    KField: KForm.Field
  }
}
```

### 属性

与 `KForm.schema.fields` 的配置项完全相同

### 示例

```jsx
<k-form :model="form">
  <k-field 
    :value="form.name" 
    type="KForm.TYPE.INPUT" 
    field="name" 
    label="姓名" 
    :ui="{
      readonly: true, 
      $on: { 'on-change': e => changeHandler(e) }
    }">
      <Icon slot="prefix" type="md-home" />
  </k-field>
</k-form>
```

### 注意 ⚠️

需要手动绑定 value 属性，否则无法实现双向数据绑定

使用 Field 组件将会导致以下特性失效，请酌情使用。

* `ui.$slots` 不再生效，若想实现本功能可直接在组件内正常使用 slot
* `hidden` 不再生效，可在组件上绑定指令实现隐藏功能
* `schema.form.editable` 和 `schema.form.layout` 在本组件中不生效，请在本组件中配置自身的 editable 和 layout 属性
* 「表单联动」一章涉及的内容不再生效，请自行绑定指令或监听事件来实现