<template>
  <k-form :model="form" :schema="schema" />
</template>

<script>
import KForm from '_app/keep-form'
export default {
  components: {
    KForm: KForm.Form,
  },
  data() {
    return {
      form: {
        name: ''
      },
      schema: {
        form: {
          ui: { 
            labelPosition: 'left',
            labelWidth: 100
          }
        },
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'name',
          label: '姓名：'
        }, {
          type: KForm.TYPE.RADIO,
          field: 'sex',
          label: '性别：',
          ui: {
            $data: [{id: 0, name: '女'}, {id: 1, name: '男'}]
          },
        }]
      }
    }
  }
}
</script>