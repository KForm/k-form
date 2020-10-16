<template>
  <div>
    <div style="margin: 20px;">
      {{ form }}
      <keep-form ref="form" v-model="schema" :model="form">
      </keep-form>
      <Button type="primary" @click="handleAddField">操作</Button>
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
        name:'王爽（wangshuang）',
        deparment:'Keep/研发中心/质量部/工程效率组',
        baseInfo: {
          name:'',
          deparment:'',
        },
        pay:[
          {
            date:'',
            money:'',
            type:''
          },
          {
            date:'',
            money:'',
            type:''
          },
          {
            date:'',
            money:'',
            type:''
          }
        ]
      },
      schema: {
        form: { ui: { labelWidth: 100 } },
        fields: [
          {
            ui:{
              title:'基本信息'
            },
            field:'baseInfo',
            type:'Object',
            fields:[
              {
                type: KeepForm.TYPE.INPUT,
                field: 'name',
                label: '姓名'
              },
              {
                type: KeepForm.TYPE.INPUT,
                field: 'deparment',
                label: '部门'
              }
            ]
          },
          {
            ui:{
              title:'费用及支付计划'
            },
            field:'pay',
            type:'Array',
            children:{
              ui:{
                title:'计划',
                $slots:[
                  {
                    name:'extra',
                    render:(h,index)=><Button type="text" onClick={this.handleDeletePay(index)}>111s</Button>
                  }
                ]

              },
              fields:[
                {
                  type: KeepForm.TYPE.INPUT,
                  field: 'date',
                  label: '支付日期'
                },
                {
                  type: KeepForm.TYPE.INPUT,
                  field: 'money',
                  label: '支付金额'
                },
                {
                  type: KeepForm.TYPE.INPUT,
                  field: 'type',
                  label: '发票类型'
                }
              ]
            }
          },

          // {
          //   // form: {
          //   //   name: '',
          //   //   fee: [{
          //   //     name:'pay1',
          //   //     chidlren:[
          //   //       {
          //   //         field:'department2'
          //   //       },
          //   //       ...fields
          //   //     ]
          //   //   }]
          //   // },
          //   title:'费用及支付计划',
          //   name:'fee',
          //   addAble:true,
          //   // bordered:false,
          //   // disHover:true,
          //   children:[
          //     {
          //       title:'支付计划',
          //       name:'pay',
          //       children:[
          //         {
          //           type: KeepForm.TYPE.INPUT,
          //           field: 'deparment',
          //           label: '部门'
          //         },
          //         {
          //           type: KeepForm.TYPE.INPUT,
          //           editable:false,
          //           field: 'deparment',
          //           label: '部门'
          //         },
          //         {
          //           type: KeepForm.TYPE.INPUT,
          //           editable:false,
          //           field: 'deparment',
          //           label: '部门'
          //         },
          //         {
          //           type: KeepForm.TYPE.INPUT,
          //           editable:false,
          //           field: 'deparment',
          //           label: '部门'
          //         }
          //       ]
          //     }
          //   ]
          // }
        ]
      }
    }
  },
  methods:{
    handleDeletePay(field,index){
      console.log('complex-layout pay item click',field,index)
      return ()=>{
        console.log('complex-layout pay item click',field)
      }
    },
    handleAddField(){
      console.log(this.$refs.form.$field('date-2'))
    }
  }
}
</script>