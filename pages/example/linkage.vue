<template>
  <div>
    <div>
      <keep-form v-model="schema" :model="form">
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
        rate1: 2,
        name: '123',
        a: '',
        b: '',
        c: '',
        d: ''
      },
      usable: true,
      schema: {
        form: { ui: { labelWidth: 200 }, inject: ['form', '__usable'] },
        fields: [{
          type: KeepForm.TYPE.RATE,
          field: 'rate',
          label: '评分',
          ui: {
            character: 'A',
            disabled: '{{ form.rate1 > 3 }}',
            count: '{{ form.rate1 > 3 ? 10 : 5 }}',
          },
          layout: {
            span: '{{ form.rate1 > 3 ? 24 : 12 }}'
          },
        }, {
          type: KeepForm.TYPE.INPUT,
          field: 'name',
          label: '姓名',
          editable: '{{ form.rate1 > 3 ? true : false }}',
        }, {
          type: KeepForm.TYPE.SELECT,
          field: 'a',
          label: 'a',
          ui: { $data: [{ id: 0, name: 'b 隐藏' }, { id: 1, name: 'b 显示' }], $on: {
            'on-change': e => {
              this.usable = Boolean(e)
            }
          } }
        }, {
          type: KeepForm.TYPE.RADIO,
          field: 'b',
          label: 'b',
          ui: { $data: [{ id: 0, name: 'c 不可用' }, { id: 1, name: 'c 可用' }] },
          hidden: '{{ form.a === 0 }}'
        }, {
          type: KeepForm.TYPE.INPUT,
          field: 'c',
          label: 'c',
          ui: { disabled: '{{ form.b === 0 }}' }
        }, {
          type: KeepForm.TYPE.INPUT,
          field: 'd',
          label: 'd',
          editable: '{{ form.b !== 0 }}',
        }, {
          type: KeepForm.TYPE.INPUT,
          field: 'e',
          label: 'e',
          editable: '{{ __usable() }}'
        }]
      }
    }
  },
  computed: {
    _usable() {
      return this.usable
    }
  },
  methods: {
    handler(e) {
      console.log(e)
    },
    __usable() {
      return this._usable && this.form.b
    }
  }
}
</script>

<style>
.a {
  width: 100px;
}
.b {
  width: 200px;
}
.aa {
  background: red;
}
.bb {
  background: yellow;
}
</style>