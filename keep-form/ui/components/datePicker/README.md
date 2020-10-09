### datePicker 组件
format同时支持对value的格式化

#### 属性

支持 iview datePicker 组件的所有属性

#### 事件

支持 iview datePicker 组件的所有事件

#### 插槽

支持 iview datePicker 组件的所有插槽

#### 方法

支持 ref 的形式调用方法，支持 iview datePicker 组件的所有方法


### slot
自定义选择器的显示内容，配合参数 open confirm 及事件来手动控制组件的显示状态，详见示例

#### 示例

```
[{
  type: KeepForm.TYPE.DATEPICKER,
  field: 'date2',
  label: 'date2',
  layout:{
    span:6
  },
  ui:{
    type:'date',
    open:this.date2Open,
    confirm:true,
    $slots:[
      {
        name:'default',
        render:()=>{
          return (
            <a href="javascript:void(0)" onClick={this.handleDate2Open}>
              <Icon type="ios-clock-outline"></Icon>
              <template>{this.form.date2 === ''? 'select date' :this.form.date2}</template>
            </a>
          )
        }
      }
    ],
    $on:[
      {
        'on-ok': (e) =>{
          this.date2Open = false
        },
        'on-change': (date) => {
          this.form.date2 = date
        },
        'on-clear': (e) => {
          this.date2Open = false
        }
      }
    ]
  }
}]

<keep-field 
  :value="form.date"
  type="k-date-picker" 
  field="date" 
  label="选择日期" 
  confirm 
  :ui="{ 
    open:open,
    confirm:true,
    format:'yyyy-MM-dd',
    $on: { 
      'on-change': (e) => handleChange(e),
      'on-clear':handleClear,
      'on-ok':handleOk
      } 
  }"
>
  <a href="javascript:void(0)" @click="handleClick">
    <template v-if="form.date === ''">Select date</template>
    <template v-else>{{ form.date }}</template>
  </a>
</keep-field>
```