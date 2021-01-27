# 组件

> 搭配后台返回 json schema 渲染表单可以很快速的完成表单开发，但在纯前端开发的情境下，编写大量的表单 json 无疑会加重开发成本。因此你可以直接使用组件来完成表单开发。

```jsx
<k-form :model="form" :ui="{ inline: true }" :rules="{ name: { required: true }, age: { required: true } }">
  <k-field v-model="form.name" field="name" type="KForm.TYPE.INPUT" label="姓名" />
  <k-field v-model="form.age" field="age" type="KForm.TYPE.INPUT" label="年龄" />
</k-form>
```

等价于：

```jsx
<k-form :model="form" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        form: {
          rules: {
            name: { required: true },
            age: { required: true }
          },
          ui: {
            inline: true
          }
        },
        fields: [{
          field: 'name',
          type: KForm.TYPE.INPUT,
          label: '姓名'
        }, {
          field: 'age',
          type: KForm.TYPE.INPUT,
          label: '年龄'
        }]
      }
    }
  }
}
```

⚠️ 在纯前端开发场景下，组件模式可以减少大量样本代码，提高开发效率。但请注意如下事项，否则会适得其反：

* k-form 支持 schema + field 组件共存，但 form 的 editable、layout 不会生效于组件渲染的字段

```jsx
<k-form :model="form" v-model="schema" >
  <k-field v-model="form.name" field="name" type="KForm.TYPE.INPUT" label="姓名" />
</k-form>
```

```js
export default {
  data() {
    return {
      schema: {
        form: {
          // 对 name 无效，对 age 有效
          editable: false,
          // 对 name 无效，对 age 有效
          layout: {
            span: '24'
          }
        },
        fields: [{
          field: 'age',
          type: KForm.TYPE.INPUT,
          label: '年龄'
        }]
      }
    }
  }
}
```

* k-field 的 `ui.$slots` 不再生效，可直接在组件内正常使用 slot

```jsx
<!-- 无效 -->
<k-form :model="form" >
  <k-field v-model="form.name" field="name" type="KForm.TYPE.INPUT" label="姓名" :ui="{
    $slots: [{
      name: 'prefix',
      render: h => h('p', {}, 'pre')
    }]
  }" />
</k-form>

<!-- 有效 -->
<k-form :model="form" >
  <k-field v-model="form.name" field="name" type="KForm.TYPE.INPUT" label="姓名">
    <p slot="prefix">pre</p>
  </k-field>
</k-form>
```

* k-field 的一切模板字符串不再生效，请使用指令实现联动

```jsx
<!-- 无效 -->
<k-field v-model="form.name" field="name" type="KForm.TYPE.INPUT" label="{{ form.age > 18 ? '姓名' : '昵称' }}"  />

<!-- 有效 -->
<k-field v-model="form.name" field="name" type="KForm.TYPE.INPUT" :label="form.age > 18 ? '姓名' : '昵称'"  />
```
* k-form、k-field 的所有 api 对组件渲染的字段不生效

```jsx
<k-form ref="form" :model="form" v-model="schema" >
  <k-field v-model="form.name" field="name" type="KForm.TYPE.INPUT" label="姓名" />
</k-form>
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          field: 'age',
          type: KForm.TYPE.INPUT,
          label: '年龄'
        }]
      }
    }
  },
  mounted() {
    // 无效
    this.$refs.form.updateField('name', { label: '昵称' })
    // 有效
    this.$refs.form.updateField('age', { label: '周岁' })
  }
}
```

* 不建议 schema、field 组件共存。若后端支持表单配置存储，建议使用纯 schema 渲染；若后端支持力度有限，建议纯前端开发，完全使用组件渲染