<template>
  <div>
    <div>
      <keep-form :model="form" :schema="schema">
        <keep-field :value="form.range1" type="k-slider" field="range1" label="数值" />
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
        range: [50, 60],
        range1: 90
      },
      schema: {
        form: { labelWidth: 200 },
        fields: [{
          type: KeepForm.TYPE.SLIDER,
          field: 'range',
          label: '范围',
          ui: {
            range: true,
            step: 10,
            showInput: true,
            $on: {
              'on-change': e => this.handler(e)
            }
          }
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