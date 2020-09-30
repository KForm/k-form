<template>
  <div>
    {{ form }}
    <keep-form ref="form1" :model="form" :schema="schema">
      <keep-field
        :value="form.time1"
        type="k-time-picker" 
        field="date" 
        label="时间" 
        :ui="{
          type:'timerange',
          $on: { 'on-change': (e) => handler(e) } 
        }"
        :rules="{ required: true, message: '请选择时间' }"
      >
      </keep-field>
      <keep-field
        :value="form.time2"
        type="k-time-picker" 
        field="time2" 
        label="时间" 
        :ui="{
          open:timeOpen,
          confirm:true,
          type:'timerange',
          $on: { 
            'on-change': (time) => {
              form.time2 = time
            },
            'on-clear':()=>{
              timeOpen= false
            },
            'on-ok':()=>{
              timeOpen= false
            }
          } 
        }"
      >
        <a href="javascript:void(0)" @click="handleTimeClick">
          <Icon type="ios-clock-outline"></Icon>
          <template v-if="form.time2 === ''">Select time</template>
          <template v-else>{{ form.time2 }}</template>
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
        time2:'',
        time1:''
      },
      timeOpen:false
    }
  },
  computed:{
    schema(){
      return {
        form: { ui: { labelWidth: 200 } },
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
      this.form.date2Open = !this.form.date2Open
    },
    handleTimeClick(){

    }
  }
}
</script>