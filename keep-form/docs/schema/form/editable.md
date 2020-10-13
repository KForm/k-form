# Editable

> 表单模式，可以指定为填写模式（true）或查看模式（false），默认为 true

我们通常的中后台项目中都包含表单填写页面（新增、编辑）和表单查看页面（详情），我们一般会将这些页面复用到同一个组件中，根据传入的属性（或 url 参数）的不同渲染不同的组件。

如下：

```jsx
<Form :model="form">
  <Col span="12">
    <FormItem label="name" prop="name">
      <Input v-if="isCreate" v-model="form.name" />
      <p v-else>{{ form.name }}</p>
    </FormItem>
  </Col>
</Form>
```

```js
export default {
  computed: {
    isCreate() {
      return this.$route.query.mode === 'new' || this.$route.query.mode === 'edit' 
    }
  }
}
```

使用 KForm 实现上述需求：

```jsx
<k-form :model="form" :schema="{
  form: {
    editable: isCreate
  }
}"/>
```