<template>
  <div>
    <div>
      <keep-form ref="form" v-model="schema" :model="form">
      </keep-form>
      {{ form }}
    </div>
  </div>
</template>

<script>
import KeepForm from '_app/keep-form'
export default {
  components: {
    KeepForm: KeepForm.Form,
    // KeepField: KeepForm.Field
  },
  data() {
    return {
      form: {
        rate: 3,
        select: 'shanghai',
        name: '123',
        num:0
      },
      schema: {
        form: { ui: { labelWidth: 200 } },
        fields: [{
          type: KeepForm.TYPE.SELECT,
          field: 'select',
          label: '省份',
          ui:{
            $data:[
              {
                id:'beijing',
                name:'北京',
              },
              {
                id:'shanghai',
                name:'上海'
              }
            ],
            $on:{
              'on-change':this.handleSelectChange
            }
          }
        }, {
          type: KeepForm.TYPE.INPUT,
          field: 'name1',
          label: '姓名1'
        }, {
          type: KeepForm.TYPE.INPUT,
          field: 'name2',
          label: '姓名2'
        }, {
          type: KeepForm.TYPE.INPUT,
          field: 'name3',
          label: '姓名3'
        }, {
          type: KeepForm.TYPE.INPUT,
          field: 'name4',
          label: '姓名4'
        }, {
          type: KeepForm.TYPE.INPUT,
          field: 'name5',
          label: '姓名5'
        }, {
          type: KeepForm.TYPE.INPUT,
          field: 'name8',
          label: '姓名8'
        }, {
          type: KeepForm.TYPE.INPUT_NUMBER,
          field: 'num',
          label: '需要input个数',
          ui:{
            $on:{
              'on-change':this.handleNumChange
            }
          }
        }]
      }
    }
  },
  methods: {
    handler(e) {
      console.log(e)
    },
    async handleNumChange(val){
      await this.$refs.form.updateForm({
        ui:{labelWidth: 300 }
      }).then(res=>{
        console.log(res)
        console.log(this.schema.form)
      })
      // await this.$refs.form.$field('name8').delete()
      // await this.$refs.form.$field('name1').update({
      //   label:'通过field改变的name1'
      // })
      // await this.$refs.form.deleteField(['name1',2,3])
      await this.$refs.form.insertField([{
        type: KeepForm.TYPE.INPUT,
        field: 'name9',
        label: '姓名9'
      },{
        type: KeepForm.TYPE.INPUT,
        field: 'name10',
        label: '姓名10'
      },{
        type: KeepForm.TYPE.INPUT,
        field: 'name11',
        label: '姓名11'
      }],1)
    },
    handleSelectChange(value){
      this.$refs.form.$field('name1').delete()
      // await this.$refs.form.updateField('name1',{
      //   label:'123123'
      // })
      this.$refs.form.updateField({
        name2:{
          type: KeepForm.TYPE.SELECT,
          label:'省份1',
          ui:{
            $data:[
              {
                id:'jiangsu',
                name:'江苏',
              },
              {
                id:'zhejiang',
                name:'浙江'
              }
            ]
          }
        },
        name3:{
          type:KeepForm.TYPE.SELECT,
          label:'省份2',
          ui:{
            $data:[
              {
                id:'yunnan',
                name:'云南',
              },
              {
                id:'chongqing',
                name:'重庆'
              }
            ]
          }
        }
      }).then(res=>{
        console.log('q123122',res)
      })
    }
  }
}
</script>