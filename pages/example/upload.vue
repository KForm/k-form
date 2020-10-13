<template>
  <div>
    {{ form }}
    <keep-form :model="form" :schema="schema">
      <keep-field 
        :value="form.value"  
        field="value"  
        type="k-upload"
        label="附件"
        :editable="false"
        :ui="{
          isDrag:true,
          onComplete:handleOnComplete,
          canDelete:false
        }"
      >
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
        value:[
          {
            key: 'img1.jpg',
            url: 'https://www.veer.com/photo/151051101'
          },
          {
            key: 'img2.jpg',
            url: 'http://www.xxx.com/img2.jpg'
          }
        ],
        value2:[]
      }
    }
  },
  computed:{
    schema(){
      return {
        form: { ui: { labelWidth: 200 } },
        fields: [{
          type: KeepForm.TYPE.UPLOAD,
          field: 'value2',
          label: '附件2',
          ui:{
            isDrag:true,
          }
        }]
      }
    }
  },
  methods:{
    handleOnComplete(res){
      console.log('2222222')
    }
  }
}
</script>