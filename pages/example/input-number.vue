<template>
  <div>
    <div>
      <keep-form :model="form" :schema="schema">
        <keep-field :value="form.age1" type="k-input-number" field="age1" label="年纪" :ui="{ min: 50 }" />
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
        age: 30,
        age1: 50
      },
      schema: {
        form: { labelWidth: 200 },
        fields: [{
          type: KeepForm.TYPE.INPUT_NUMBER,
          field: 'age',
          label: '年龄',
          ui: {
            step: 10,
            $on: {
              'on-change': e => this.handler(e)
            }
          },
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