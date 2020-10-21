import { TYPE } from '../../../core/types'

export default {
  name: TYPE.COLOR_PICKER,
  inheritAttrs: false,
  render(h) {
    const { editable, value } = this.$attrs
    return (
      editable ? <ColorPicker {...{ props: this.$attrs, on: this.$listeners}}/> : <p>{ value }</p>
    )
  }
}