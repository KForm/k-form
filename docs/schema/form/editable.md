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
<k-form :model="form" v-model="schema"/>
```

```js
export default {
  data() {
    return {
      schema: {
        form: {
          editable: isCreate
        }
      }
    }
  }
}
```

### 规则

各组件在 `editable = false` 模式下的翻译规则如下：

* `KForm.TYPE.AUTO_COMPLETE -> value -> 值`
* `KForm.TYPE.CASCADER -> 根据 value 逐级找到所对应的 label，并用 / 拼接 -> 选项1 / 选项2 / 选项3`
* `KForm.TYPE.CHECKBOX -> 独立模式返回是或否；组模式根据 $data 找到 id 所对应的 name，并用，拼接  -> 是；选项1，选项2，选项3`
* `KForm.TYPE.COLOR_PICKER -> value -> 值`
* `KForm.TYPE.DATEPICKER -> moment 格式化 value -> 2020-11-10`
* `KForm.TYPE.INPUT -> value -> 值`
* `KForm.TYPE.INPUT_NUMBER -> value -> 值`
* `KForm.TYPE.RADIO -> 根据 $data 找到 id 所对应的 name -> 选项1`
* `KForm.TYPE.RATE -> disabled = true`
* `KForm.TYPE.SELECT -> 根据 $data 找到 id 所对应的 name -> 选项1`
* `KForm.TYPE.SLIDER -> range = true 用 ~ 拼接两个端点；range = false 返回 value -> 1 ~ 100；80`
* `KForm.TYPE.SWITCH -> 返回是或否 -> 是`
* `KForm.TYPE.TEXT -> value -> 值`
* `KForm.TYPE.TIMEPICKER -> value -> 09:41:00`
* `KForm.TYPE.UPLOAD -> 返回图片列表，可处理删除、下载、打开链接等操作`
* `KForm.TYPE.WIDGET -> 不支持，需要自行处理`