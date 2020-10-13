# 组件实例

有时候我们需要获取到 iview 组件的实例来完成一些操作，比如调用 `iview.Input` 的 focus 方法实现自动聚焦。

KForm 支持以下两种方式获取到 `iview.Input` 实例：

### 在 Form 组件中获取实例

```jsx
<k-form ref="form" :model="form}" :schema="{
  fields: [{
    type: KForm.TYPE.INPUT,
    field: 'name',
    label: '姓名；'
  }] 
}" />
```

```js
mounted() {
  // this.$refs.form.$field('name') 获取到 iview.Input
  this.$refs.form.$field('name').focus()
}
```

### 在 Field 组件中获取实例

```jsx
<k-form :model="form">
  <k-field ref="name" :value="form.name" type="KForm.TYPE.INPUT" field="name" label="姓名：" />
</k-form>
```

```js
mounted() {
  // this.$refs.name.$field 获取到 iview.Input
  this.$refs.name.$field().focus()
}
```