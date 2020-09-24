<template>
  <div>
    <div>
      <keep-form :model="form" :schema="schema">
        <keep-field :value="form.color1" type="k-color-picker" field="color1" label="颜色1" :ui="{ alpha: true }" />
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
        color: '#ff4f4f',
        color1: ''
      },
      schema: {
        form: { labelWidth: 200 },
        fields: [{
          type: KeepForm.TYPE.COLOR_PICKER,
          field: 'color',
          label: '颜色',
          ui: {
            recommend: true,
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