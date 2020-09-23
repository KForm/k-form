<template>
  <div>
    <div>
      <keep-form :model="form" :schema="schema">
        <keep-field :value="form.name1" type="k-auto-complete" field="name1" label="姓名1" :ui="{
          data: dataSource,
          $on: {
            'on-search': e => handleSearch(e)
          }
        }">
          <Option v-for="item in dataSource" :key="item" :value="item" style="color: green;">{{ item }}</Option>
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
        name: '',
        name1: ''
      },
      dataSource: ['Steve Jobs', 'Stephen Gary Wozniak', 'Jonathan Paul Ive'],
    }
  },
  computed: {
    schema() {
      return {
        form: { labelWidth: 200 },
        fields: [{
          type: KeepForm.TYPE.AUTO_COMPLETE,
          field: 'name',
          label: '姓名',
          ui: {
            data: this.dataSource,
            'filter-method': this.filterMethod
          }
        }]
      }
    }
  },
  methods: {
    handleSearch(e) {
      this.dataSource = !e ? [] : [
        e,
        e + e,
        e + e + e
      ]
    },
    filterMethod (value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
    }
  }
}
</script>