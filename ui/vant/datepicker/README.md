### Datetime 组件
本组件是基于 vant 和 keepfe vant-ui 进行开发，具体请查看 [vant-ui文档](https://phab.gotokeep.com/diffusion/NPMPKGVANTUI/browse/master/)

时间选择器

#### 属性

支持vant-ui中所有属性

type: 日期选择器类型，可选值：date、datetime(默认)
pickerInfo:日期选择器picker相关配置,具体配置如下
  {
    title:'picker标题',
    message:'未选择时的提示'
  }

#### 事件
支持vant-ui中所有事件

#### 插槽
无

#### 示例
1. schema
```js
[{
  type:KForm.TYPE.DATE_PICKER,
  field:'datetime',
  label:'日期选择',
  ui:{
    type:'date',
    pickerInfo:{
      title: '日期选择框',
      message:'请选择日期'
    },
    placeholder:'请选择日期'
  }
}]
```
2. template
```vue
<template>
  <Form>
    <FormItem v-model="form.datetime" type="date-picker"  label="选择日期时间" :ui={ type:'datetime',pickerInfo:{title:'日期选择框',message:'请选择日期'}}  />
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