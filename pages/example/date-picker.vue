<template>
  <div class="demo">
    {{ form }}
    <keep-form ref="form1" :model="form" :schema="schema">
      <keep-field
        :value="form.date" 
        type="k-date-picker" 
        field="date" 
        label="日期"
        :ui="{
          type:'daterange',
          format:'yyyy-MM-dd',
          $on: { 'on-change': (e) => handler(e) } 
        }"
        :rules="{ required: true, message: '请选择日期' }"
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
        date:[]
      }
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
            field: 'date1',
            label: '日期1',
            ui: {
              type: 'datetime',
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
    }
  }
}
</script>