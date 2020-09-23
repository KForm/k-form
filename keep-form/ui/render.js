import Field from './field'

export default function render(h, field, key) {
  return h(Field, {
    props: {
      type: field.type,
      value: field.value
    },
    on: {
      input: e => this.$emit('on-change', {
        field: field.field, 
        e
      })
    }
  })
}