import { _layout, _editable } from '../config'
export default {
  props: {
    field: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number, Array, Boolean, Date,Object],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    ui: {
      type: Object,
      default: () => ({})
    },
    layout: {
      type: Object,
      default: () => _layout
    },
    rules: {
      type: [Object, Array]
    },
    editable: {
      type: [Boolean, String],
      default: _editable
    },
    format: {
      type: String,
      default: ''
    },
    hidden: {
      type: [Boolean, String],
      default: false
    },
    refName: {
      type: String
    },
    groupName: {
      type: String
    },
    component: {
    },
  },
  inject: ['$context', '$inject', 'formHanlder', 'deleteField', 'updateField'],
  methods: {
    $ui(){
      return this.$refs[`K-${this.field}`].$refs[this.field]
    },
    delete(){
      return this.deleteField(this.field)
    },
    update(info){
      return this.updateField(this.field,info)
    }
  }
}