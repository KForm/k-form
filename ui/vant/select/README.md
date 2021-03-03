### Select 组件
本组件是基于 keepfe vant-ui组件进行开发，具体请查看 [vant-ui文档](https://phab.gotokeep.com/diffusion/NPMPKGVANTUI/browse/master/)

下拉框选择器，暂时不支持级联选择

#### 属性

支持vant-ui中 picker 组件的所有属性
$data：
id -> Option.value
name -> Option.label
disabled -> Option.disabled
render -> 自定义 Option 的渲染内容，render 支持值渲染和函数渲染，需要注意的是，函数渲染若想操作 this，请使用普通函数而非箭头函数，否则无法获取正确的 this，见下例。

#### 事件

支持vant-ui中 picker 组件的所有事件

#### 示例
1. schema
```js
var addressList = [{id:'wangjinghuayuan',name:'望京花园'}，{id:'chaotinggongyu',name:'朝廷公寓'},{id:'jiarunhuayuan',name:'嘉润花园'}]
[{
  type: KForm.TYPE.SELECT,
  field: 'address',
  label: '家庭住址',
  ui:{
    $data:addressList,
    pickerInfo:{
      name: 'picker',
      title: '家庭住址'
    },
    placeholder:'请选择家庭住址'
  }
}]
```
2. template
```vue
<template>
  <Form>
    <FormItem v-model="form.address" type="select" label="家庭住址" :ui="{$data:addressList,pickerInfo:{title:'家庭住址',message:'请选择家庭住址'}}" />
</template>
<script>
export default {
  data(){
    return {
      form:{
        address:''
      }
    }
  }
}
</script>
```