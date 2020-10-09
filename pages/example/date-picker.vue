<template>
  <div>
    {{ form }}
    <keep-form ref="form1" :model="form" :schema="schema">
      <keep-field 
        :value="form.date1"
        type="k-date-picker" 
        field="date1"
        label="日期选择1" 
        :ui="{ 
          format:'yyyy-MM-dd',
          open:date1Open,
          confirm:true,
          $on:{
            'on-change':(date)=>form.date1 = date,
            'on-ok':(e)=>date1Open = false,
            'on-clear':(e)=>date1Open = false
          }
        }"
      >
        <a href="javascript:void(0)" @click="handleDate1Open">
          <Icon type="ios-calendar-outline"></Icon>
          <template v-if="form.date1 === ''">Select date</template>
          <template v-else>{{ form.date1 }}</template>
        </a>
      </keep-field>
      <keep-field 
        :value="form.date2"
        type="k-date-picker" 
        field="date2" 
        label="日期选择2" 
        :ui="{ 
          format:'yyyy-MM-dd'
        }"
      >
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
        date1:'2020-09-12',
        date2:'2020-09-12',
        date3:'2020-09-21',
        date4:''
      },
      date1Open:false,
      date3Open:false,
      name: '2020-09-12'
    }
  },
  computed:{
    schema(){
      return {
        form: {
          ui: {
            labelWidth: 200,
          },
        },
        fields: [
          {
            type: KeepForm.TYPE.DATEPICKER,
            field: 'date3',
            label: '日期选择3',
            ui:{
              type:'date',
              open:this.date3Open,
              format:'yyyy-MM-dd',
              confirm:true,
              $slots:[
                {
                  name:'default',
                  render:()=>{
                    return (
                      <a href="javascript:void(0)" on-click={(e) => this.handleDate3Open(e)}>
                        <Icon type="ios-clock-outline"></Icon>
                        <span>{ this.form.date3 === '' ? 'Select date' : this.form.date3 }</span>
                      </a>
                    )
                  }
                }
              ],
              $on:{
                'on-ok': (e) =>{
                  this.date3Open = false
                },
                'on-change': e => {
                  // console.log('date3 change',e)
                  this.form.date3 = e
                },
                'on-clear': (e) => {
                  this.date3Open = false
                }
              }
            }
          },
          {
            type: KeepForm.TYPE.DATEPICKER,
            field: 'date4',
            label: '日期选择4',
            ui:{
              type:'date',
              format:'yyyy-MM-dd',
              $on:[
                {
                  'on-change': (date) =>console.log(date)
                }
              ]
            }
          }
        ]
      }
    }
  },
  methods: {
    handleDate1Open(){
      this.date1Open = !this.date1Open
    },
    handleDate3Open(){
      this.date3Open = !this.date3Open
    }
  }
}
</script>