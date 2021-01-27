export const _layout = { span: '12' }

export const _editable = true

export const _schema = {
  form: {
    ui: {},
    editable: _editable,
    layout: _layout,
    inject: ''
  },
  fields: [],
}

export const nativeFormProps = {
  inline: {
    type: Boolean,
    default: false
  },
  labelPosition: {
    type: String,
    default: 'right'
  },
  labelWidth: {
    type: Number
  },
  showMessage: {
    type: Boolean,
    default: true
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  hideRequiredMark: {
    type: Boolean,
    default: false
  },
  labelColon: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
}