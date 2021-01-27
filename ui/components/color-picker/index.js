import { TYPE } from '../../../core/types'

export default {
  name: TYPE.COLOR_PICKER,
  inheritAttrs: false,
  render(h) {
    const { editable, value, formatter } = this.$attrs
    return (
      editable ? <ColorPicker {...{ props: this.$attrs, on: this.$listeners}}/> : <p>{ formatter || value }</p>
    )
  }
}