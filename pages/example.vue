<template>
  <div>
    <div style="overflow: hidden;">
      <keep-form ref="form" :model="form" :schema="schema">
        <keep-field
          ref="name1"
          type="k-input"
          field="name1"
          label="姓名1"
          :value="form.name1"
          :rules="{ required: true }"
        >
          <Icon slot="prefix" type="md-home"/>
        </keep-field>
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
    KeepField: KeepForm.Field,
  },
  data() {
    return {
      form: {
        name: '',
        name1: '',
        favorite: []
      },
      schema: {
        form: { labelWidth: 200 },
        fields: [{
          type: KeepForm.TYPE.INPUT,
          field: 'name',
          label: '姓名',
          ui: {
            // type: 'number',
            // prefix: 'md-home',
            $slots: [{
              name: 'prefix',
              render: h => <Icon type="md-home" slot="prefix"/>
            }]
          },
          rules: {
            required: true
          }
        }, {
          type: KeepForm.TYPE.CHECKBOX,
          field: 'favorite',
          label: '喜好',
          ui: {
            $data: [{id: 0, name: '苹果', render: function() { return <span>{ this.name } hahaha</span> }}, {id: 1, name: '香蕉'}, {id: 2, name: '葡萄'}]
          },
        }]
      }
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.$refs.form.$refs['KeepForm'].validate(valid => console.log(valid))
    // }, 2000)
    // setTimeout(() => {
    //   console.log(this.$refs.fieldRef.$field().focus())
    //   this.$refs.test.$field().focus()
    // }, 2000) 
    setTimeout(() => {
      // console.log(this.$refs.form.$field('name').focus())
      // this.$refs.name1.$field().focus()
      this.$set(this.form, 'name1', 'qinchuan')
    }, 2000)
  },
  methods: {
    handler(e) {
      console.log(e)
    }
  }
}
</script>