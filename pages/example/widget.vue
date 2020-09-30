<template>
  <div>
    <div>
      <keep-form :model="form" :schema="schema">
        <keep-field type="k-widget" field="widget" label="自定义1" :component="h => h('input', {
          attrs: {
            value: form.widget
          },
          on: {
            input: e => form.widget = e.target.value
          }
        })" />
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
    KeepField: KeepForm.Field
  },
  data() {
    return {
      form: {
        widget: '',
      },
      schema: {
        form: { ui: { labelWidth: 200 } },
        fields: [{
          type: KeepForm.TYPE.WIDGET,
          field: 'widget',
          label: '自定义',
          rules: { required: true },
          component: h => <input value = { this.form.widget } on-input = { e => {
            this.form.widget = e.target.value
            return
          }} />
        }]
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