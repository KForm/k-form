<template>
  <div>
    {{ form }}
    <keep-form :model="form" :schema="schema">
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
    </keep-form>
  </div>
</template>

<script>
import KeepForm from '_app/keep-form'
export default {
  components: {
    KeepForm: KeepForm.Form,
    KeepField: KeepForm.Field
  },
  data(){
    return {
      form:{
        value:['beijing','gugong','tiananmen'],
        value2:[]
      },
      data: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫',
              children:[
                {
                  value:'tiananmen',
                  label:'天安门'
                }
              ]
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙',
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园',
                },
                {
                  value: 'shizilin',
                  label: '狮子林',
                }
              ]
            }
          ]
        }
      ]
    }
  },
  computed:{
    schema(){
      return {
        form: { ui: { labelWidth: 200 } },
        fields: [{
          type: KeepForm.TYPE.CASCADER,
          field: 'value2',
          label: '景点',
          rules: { required: true },
          ui:{
            data:this.data
          }
        }]
      }
    }
  }
}
</script>