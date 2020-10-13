### Cascader 组件

#### 属性

支持 iview Cascader 组件的所有属性
data属性


#### 事件

支持 iview Cascader 组件的所有事件

#### 插槽

支持 iview Cascader 组件的所有插槽

#### 方法

支持 iview Cascader 组件的所有方法

#### 示例

```
 <keep-field 
  :value="form.value"  
  field="value"  
  type="k-cascader"
  label="景点" 
  :editable="false"
  :ui="{
    data: data
  }">
</keep-field>
data(){
  return {
    data:[
      {
        value:'beijing',
        label:'北京',
        children:[
          {
            value:'tiantan',
            label:'天坛',
          },
          {
            value:'gugong',
            label:'故宫',
          }
        ]
      }
    ]
  }
}

fields: [{
  type: KeepForm.TYPE.CASCADER,
  field: 'value2',
  label: '景点',
  rules: { required: true },
  ui:{
    data:this.data
  }
}]
```