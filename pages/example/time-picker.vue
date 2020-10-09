<template>
  <div>
    <p>
      {{ form }}
    </p>
    <keep-form ref="form1" :model="form" :schema="schema">
      <keep-field
        :value="form.time1"
        type="k-time-picker" 
        field="time1" 
        :editable="false"
        label="时间1" 
        :ui="{
          format:'hh点mm分',
          $on: { 'on-change': (e) => handler(e) } 
        }"
        :rules="{ required: true, message: '请选择时间' }"
      >
      </keep-field>
      <keep-field
        :value="form.time2"
        type="k-time-picker" 
        field="time2" 
        label="时间2" 
        :ui="{
          open:time2Open,
          confirm:true,
          $on: { 
            'on-change': (time) => {
              form.time2 = time
            },
            'on-clear':()=>{
              time2Open= false
            },
            'on-ok':()=>{
              time2Open= false
            }
          } 
        }"
      >
        <a href="javascript:void(0)" @click="handleTime2Open">
          <Icon type="ios-clock-outline"></Icon>
          <span v-if="form.time2 === ''">Select time</span>
          <span v-else>{{ form.time2 }}</span>
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
        time1:'04点49分',
        time2:'',
        time3:'',
        time4:''
      },
      time2Open:false,
      time3Open:false
    }
  },
  computed:{
    schema(){
      return {
        form: { ui: { labelWidth: 200 } },
        fields: [
          {
            type: KeepForm.TYPE.TIMEPICKER,
            field: 'time3',
            label: '时间3',
            ui:{
              open:this.time3Open,
              confirm:true,
              format:'hh时mm分ss秒',
              $slots:[
                {
                  name:'default',
                  render:()=>{
                    return (
                      <a href="javascript:void(0)" onClick={this.handleTime3Open}>
                        <Icon type="ios-clock-outline"></Icon>
                        <span>{this.form.time3 === ''? 'select time' :this.form.time3}</span>
                      </a>
                    )
                  }
                }
              ],
              $on:{
                'on-ok': (e) =>{
                  console.log('on-ok')
                  this.time3Open = false
                },
                'on-change': (time) => {
                  this.form.time3 = time
                },
                'on-clear': (e) => {
                  console.log('on-clear')
                  this.time3Open = false
                }
              }
            }
          },
          {
            type: KeepForm.TYPE.TIMEPICKER,
            field: 'time4',
            label: '时间4',
            ui: {
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
    handleTime2Open(){
      this.time2Open = !this.time2Open
    },
    handleTime3Open(){
      this.time3Open = !this.time3Open
    }
  }
}
</script>