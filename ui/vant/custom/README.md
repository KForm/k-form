### Custom 组件
本组件是基于 keepfe vant-ui组件进行开发，具体请查看 [vant-ui文档](https://phab.gotokeep.com/diffusion/NPMPKGVANTUI/browse/master/)

支持嵌入其他组件类型

#### 属性

同其他组件属性，但不支持editable属性。

#### 事件
同其他组件事件 

#### 插槽

default

#### 示例
1. schema
```js
[{
  type:KForm.TYPE.CUSTOM,
  field:'birthday',
  label:'出生日期',
  ui:{
    $slots: [{ 
      name: 'default',
      render:() => {
        return (
          <div>
            <Cell value={ this.form.birthday || '请选择出生日期' } onClick={()=>{this.show = true}}></Cell>
            <Calendar vModel={this.show} onConfirm={this.handleConfirm}/>
          </div>
        )
      }
    }]
  }
}]
```
2. template
```vue
<template>
  <Form>
    <FormItem v-model="form.birthday" type="custom" label="出生日期" >
      <Cell :value="form.birthday || '请选择出生日期'">
      <Calendar v-model="show" @confirm="handleConfirm">
      </Cell>
  </FormItem>
</template>
<script>
export default {
  data(){
    return {
      form:{
        birthday:''
      },
      show:false
    }
  },
  methods:{
    handleConfirm(date){
      this.form.birthday = date
      this.show = false
    }
  }
}
</script>
```