<template>
  <div>
    {{ form }}
    <keep-form ref="form1" :model="form" :schema="schema">
      <keep-field 
        :value="form.date1"
        type="k-date-picker" 
        field="date1" 
        label="选择日期" 
        :ui="{ 
          open:date1Open,
          confirm:true,
          format:'yyyy-MM-dd',
          $on:{
            'on-change':(e)=>handleDate1Change(e),
            'on-clear':(e)=>handleDate1clear(e),
            'on-ok':(e)=>handleDate1Ok(e)
          }
        }"
      >
        <a href="javascript:void(0)" @click="handleDate1Open">
          <template v-if="form.date1 === ''">Select date</template>
          <template v-else>{{ form.date1 }}</template>
        </a>
      </keep-field>
      <keep-field
        :value="form.time"
        type="k-time-picker" 
        field="date" 
        label="时间" 
        :layout="{
          span:6
        }"
        :ui="{
          open:timeOpen,
          confirm:true,
          type:'timerange',
          $on: { 'on-change': (e) => handler(e) } 
        }"
        :rules="{ required: true, message: '请选择时间' }"
      >
        <a href="javascript:void(0)" @click="handleTimeClick">
          <Icon type="ios-clock-outline"></Icon>
          <template>Select time</template>
        </a>
      </keep-field>
    </keep-form>
  </div>
</template>

<script>
import KeepForm from '_app/keep-form'
export default {
  name: 'Index',
  components: {
    KeepForm: KeepForm.Form,
    KeepField: KeepForm.Field
  },
  data () {
    return {
      form: {
        date:'',
        time:'',
        date1:'',
        date2:''
      },
      date1Open:false,
      date2Open:false,
      timeOpen:false
    }
  },
  computed:{
    schema(){
      return {
        form: {
          labelWidth: 100
        },
        fields: [
          {
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
                        <p>{this.form.date2 === ''? 'select date' :this.form.date2}</p>
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
          },
          {
            type: KeepForm.TYPE.TIMEPICKER,
            field: 'date1',
            label: '时间1',
            layout:{
              span:6
            },
            ui: {
              type: 'time',
              $on: {
                'on-change': (e) => console.log(e)
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    handler(e) {
      console.log(e)
    },
    handleDate1Open(){
      this.date1Open = !this.date1Open
    },
    handleDate1Change (date) {
      console.log(date)
      this.form.date1 = date
    },
    handleDate1clear () {
      this.date1Open = false
    },
    handleDate1Ok () {
      this.date1Open = false
    },
    handleDate2Open(){
      console.log('click')
      this.date2Open = !this.date2Open
    },
    handleTimeClick(){
      console.log(111)
    }
  }
}
</script>