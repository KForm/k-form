### switch 组件

#### 属性

支持 iview switch 组件的所有属性

#### 事件

支持 iview switch 组件的所有事件

#### 插槽

支持 iview switch 组件的所有插槽

#### 方法

支持 ref 的形式调用方法，支持 iview switch 组件的所有方法

#### 示例

```
[{
  type: KeepForm.TYPE.SWITCH,
  field: 'switch1',
  label: '是否禁用用户1',
  ui:{
    $slots:[
      {
        name:'open',
        render:h => <span slot={'open'}>启用</span>
      },
      {
        name:'close',
        render:h => <span slot={'close'}>禁用</span>
      }
    ]
  }
}]

<KeepField 
  :value="form.name" 
  :type="KeepForm.TYPE.SWITCH" 
  field="switch" 
  label="开关" 
  :ui="{ 
    $on: { 'on-change': (e) => console.log(e) } 
  }"
>
  <template v-slot:open>开</template>
  <template v-slot:close>关</template>
</KeepField>
```