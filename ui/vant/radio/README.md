### Radio 组件
本组件是基于 keepfe vant-ui组件进行开发，具体请查看 [vant-ui文档](https://phab.gotokeep.com/diffusion/NPMPKGVANTUI/browse/master/)



#### 属性



#### 事件
同其他组件事件 

#### 示例
1. schema
```js
[{
  type:KForm.TYPE.RADIO,
  field:'radio',
  label:'单选框',
  ui:{
    $data:[
      {
        id:1,
        name:'单选框1'
      },
      {
        id:2,
        name:'单选框2'
      }
    ]
  }
}]
```
2. template
```vue
<template>
  <Form>
    <FormItem v-model="form.radio" type="radio" label="单选框" :ui="{$data:radioList}"/>
</template>
<script>
export default {
  data(){
    return {
      radioList:[
        {
          id:1,
          name:'单选框1'
        },
        {
          id:2,
          name:'单选框2'
        }
      ]
      form:{
        radio:''
      }
    }
  }
}
</script>
```