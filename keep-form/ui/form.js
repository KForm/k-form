import BaseForm from '../core/form'
import Field from './field'
import { mapSchemaRules2UI } from '../core/utils'
import { refName, _schema } from '../core/config'
// import render from './render'

let kf = new BaseForm(this)

export default {
  components: {
    Field
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    schema: {
      type: Object,
      default: () => _schema
    },
    refName: {
      type: String,
      default: kf.refName
    }
  },
  computed: {
    formRules() {
      return mapSchemaRules2UI(this, this.schema.fields)
    }
  },
  provide() {
    return {
      formHanlder: (field, e) => {
        this.model[field] = e
        return
      }
    }
  },
  methods: {
    renderField(field, index) {
      return (
        <Field
          ref = { field.field }
          type = { field.type }
          field = { field.field }
          label = { field.label }
          value = { this.model[field.field] }
          ui = { field.ui }
          layout = { field.layout }
          rules = { field.rules }
        />
      )
    },
    $field(field) {
      return this.$refs[this.schema.fields.filter(item => item.field === field)[0].field].$field()
    },
    $form() {
      return this.$refs[refName]
    }
    // handleFieldValueChange(field, e) {
    //   this.$emit('input', {...this.value, ...{ [field]: e }})
    // }
  },
  render(h) {
    return (
      <div class="form-wrap">
        <Form ref={ refName } { ...{ props: { model: this.model, rules: this.formRules, ...this.schema.form } } } on-change={ e => console.log(e) }>
          { this.schema.fields.map((item) => this.renderField(item)) }
          { this.$slots.default }
        </Form>
      </div>
    )
  }
}