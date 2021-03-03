### Input 组件
本组件是基于 Vant 和 Keepfe vant-ui 进行开发，具体请查看 [vant-ui文档](https://phab.gotokeep.com/diffusion/NPMPKGVANTUI/browse/master/)

支持嵌入其他组件类型

#### 属性

支持vant-ui中所有属性

type：输入框类型, 可选值为 text, tel, digit, number, textarea, password 等

#### 事件
支持vant-ui中所有事件

#### 插槽
 无

#### 示例
1. schema
```js
[{
  type:KForm.TYPE.INPUT,
  field:'name',
  label:'用户名'
}]
```
2. template
```vue
<template>
  <Form>
    <FormItem v-model="form.name" type="input" label="用户名" :ui="{type:'text'}"/>
</template>
<script>
export default {
  data(){
    return {
      form:{
        name:''
      }
    }
  }
}
</script>
```