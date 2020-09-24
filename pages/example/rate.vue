<template>
  <div>
    <div>
      <keep-form :model="form" :schema="schema">
        <keep-field :value="form.rate1" type="k-rate" field="rate1" label="评分1" :ui="{ 'show-text': true }" >
          <span style="color: #f5a623;">{{ form.rate1 }}</span>
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
    KeepField: KeepForm.Field
  },
  data() {
    return {
      form: {
        rate: 3,
        rate1: 2
      },
      schema: {
        form: { labelWidth: 200 },
        fields: [{
          type: KeepForm.TYPE.RATE,
          field: 'rate',
          label: '评分',
          ui: {
            character: 'A'
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