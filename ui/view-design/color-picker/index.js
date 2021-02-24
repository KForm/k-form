import { TYPE } from '../../../package/view-design/types'

export default {
  name: TYPE.COLOR_PICKER,
  inheritAttrs: false,
  render(h) {
    const { editable, value, _formatter } = this.$attrs
    return (
      editable ? <ColorPicker {...{ props: this.$attrs, on: this.$listeners}}/> : <p>{ _formatter || value }</p>
    )
  }
}