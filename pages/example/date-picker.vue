<template>
  <div>
    {{ form }}
    <keep-form ref="form1" :model="form" :schema="schema">
      <keep-field 
        :value="form.date1"
        type="k-date-picker" 
        field="date1"
        :editable="false"
        label="选择1日期" 
        :ui="{ 
          format:'yyyy-MM-dd',
          valueFormat:'yyyy-MM-dd hh:mm:ss',
          $on:{
            'on-change':(e)=>handleDate1Change(e),
          }
        }"
      >
      </keep-field>
      <keep-field 
        :value="form.date2"
        type="k-date-picker" 
        field="date2" 
        :editable="false"
        label="select date" 
        :ui="{ 
          open:date1Open,
          confirm:true,
          format:'YYYY-MM-DD',
          $on:{
            'on-change':(e)=>handleDate1Change(e),
            'on-clear':(e)=>handleDate1clear(e),
            'on-ok':(e)=>handleDate1Ok(e)
          }
        }"
      >
        <a href="javascript:void(0)" @click="handleDate1Open">
          <!-- {{ form.date2 }}
          <template v-if="form.date2 === ''">Select date</template>
          <template v-else>111{{ form.date2 }}</template> -->
          111
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
        date1:'2020-09-12',
        date2:'2020-09-12'
      },
      date1Open:false,
      date2Open:false
    }
  },
  computed:{
    schema(){
      return {
        form: {
          labelWidth: 200,
          editable:false
        },
        fields: [
          {
            type: KeepForm.TYPE.DATEPICKER,
            field: 'date2',
            label: '选择日期',
            editable:true,
            ui:{
              type:'date',
              open:this.date2Open,
              confirm:true,
              $slots:[
                {
                  name:'default',
                  render:()=>{
                    return (
                      <a href="javascript:void(0)" on-click={(e) => this.handleDate2Open(e)}>
                        <Icon type="ios-clock-outline"></Icon>
                        <span>{!this.form.date2 ? 'select date' : this.form.date2}</span>
                      </a>
                    )
                  }
                }
              ],
              $on:{
                'on-ok': (e) =>{
                  this.date2Open = false
                },
                'on-change': e => {
                  console.log(e)
                  this.form.date2 = e
                },
                'on-clear': (e) => {
                  this.date2Open = false
                }
              }
            }
          },
          {
            type: KeepForm.TYPE.DATEPICKER,
            field: 'date2',
            label: 'select date 2',
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