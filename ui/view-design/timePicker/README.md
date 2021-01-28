### timePicker 组件

#### 属性

支持 iview timePicker 组件的所有属性

#### 事件

支持 iview timePicker 组件的所有事件

#### 插槽

支持 iview timePicker 组件的所有插槽

#### 方法

支持 ref 的形式调用方法，支持 iview timePicker 组件的所有方法


### slot
自定义选择器的显示内容，配合参数 open confirm 及事件来手动控制组件的显示状态，详见示例

#### 示例

```
{
  type: KeepForm.TYPE.TIME_PICKER,
  field: 'time',
  label: 'time',
  layout:{
    span:6
  },
  ui:{
    type:'time',
    open:this.open,
    confirm:true,
    $slots:[
      {
        name:'default',
        render:()=>{
          return (
            <a href="javascript:void(0)" onClick={this.handleOpen}>
              <Icon type="ios-clock-outline"></Icon>
              <template>{this.form.time === ''? 'select date' :this.form.time}</template>
            </a>
          )
        }
      }
    ],
    $on:[
      {
        'on-ok': (e) =>{
          this.open = false
        },
        'on-change': (time) => {
          this.form.time = time
        },
        'on-clear': (e) => {
          this.open = false
        }
      }
    ]
  }
}]

<keep-field 
  :value="form.time"
  type="k-time-picker" 
  field="date" 
  label="select time" 
  confirm 
  :ui="{ 
    open:open,
    confirm:true,
    $on: { 
      'on-change': (e) => handleChange(e),
      'on-clear':handleClear,
      'on-ok':handleOk
      } 
  }"
>
  <a href="javascript:void(0)" @click="handleOpen">
    <template v-if="form.time === ''">Select time</template>
    <template v-else>{{ form.time }}</template>
  </a>
</keep-field>
```