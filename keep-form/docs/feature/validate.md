# 表单校验

```jsx
<k-form ref="form" :model="form" :schema="{
  fields: [{
    type: KForm.TYPE.INPUT,
    field: 'name',
    label: '姓名：'
  }]
}" />
```

```js
mounted() {
  setTimeout(() => {
    // this.$refs.form.$form() 获取到 iview.Form 实例
    this.$refs.form.$form().validate(valid => {
      console.log(valid)
    })
  }, 1000)
}
```