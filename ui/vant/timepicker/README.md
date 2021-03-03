### Datetime 组件
本组件是基于 vant 和 keepfe vant-ui 进行开发，具体请查看 [vant-ui文档](https://phab.gotokeep.com/diffusion/NPMPKGVANTUI/browse/master/)

时间选择器

#### 属性

支持vant-ui中所有属性

type:时间选择器的类型，time（默认）
pickerInfo 与 datepicker 相同

#### 事件
支持vant-ui中所有事件

#### 插槽
无

#### 示例
1. schema
```js
[{
  type:KForm.TYPE.TIME_PICKER,
  field:'time',
  label:'时间选择',
  ui:{
    pickerInfo:{
      title: '时间选择框',
      message:'请选择时间'
    },
    placeholder:'请选择时间'
  }
}]
```
2. template
```vue
<template>
  <Form>
    <FormItem v-model="form.datetime" type="timepicker" label="选择时间" :ui="{pickerInfo:{title:'时间选择框',message:'请选择时间'}}" />
</template>
<script>
export default {
  data(){
    return {
      form:{
        datetime:''
      }
    }
  }
}
</script>
```