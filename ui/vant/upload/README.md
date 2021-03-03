### Upload 组件
本组件是基于 keepfe vant-ui组件进行开发，具体请查看 [vant-ui文档](https://phab.gotokeep.com/diffusion/NPMPKGVANTUI/browse/master/)

图片上传组件，目前只支持图片上传

#### 属性


属性 | 说明 | 类型 | 默认值 
----|-----|------|------ 
value | 图片组| [string] | [] 
thumbnail | 图片缩略图配置 | object | { width: 60, height: 60 } 
hasDelete | 是否展示删除按钮 | boolean | true 
openLoading | 上传图片是是否展示加载按钮 | boolean | false 
canAdd | 是否可以上传图片 | boolean | true 
disabled | 是否禁用 | boolean | false

方法 | 说明 
----|----- 
on-success | 图片上传成功后触发，返回包装后的图片上传对象 
on-error | 图片上传失败时触发，返回错误信息

#### 事件
同其他组件事件 

#### 示例
1. schema
```js
[{
  type:KForm.TYPE.UPLOAD,
  field: 'img',
  label: '照片',
  rules: {
    required: true,
    message: '请上传照片'
  },
  ui:{
    disabled:true
  }
}]
```
2. template
```vue
<template>
  <Form>
    <FormItem v-model="form.img" type="upload" label="照片" />
</template>
<script>
export default {
  data(){
    return {
      form:{
        img:[{
          name: 'WechatIMG74.jpeg',
          path: 'https://static1.keepcdn.com/plugin-vant-ui/2021/03/01/16/41/da39a3ee5e6b4b0d3255bfef95601890afd80709_3024x4032_916bcd41cffd2135a63926f30dfd64630ba90c09.jpeg',
          key: 'plugin-vant-ui/2021/03/01/16/41/da39a3ee5e6b4b0d3255bfef95601890afd80709_3024x4032_916bcd41cffd2135a63926f30dfd64630ba90c09.jpeg',
          creator: ''
        }]
      }
    }
  }
}
</script>
```