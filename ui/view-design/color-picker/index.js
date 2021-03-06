import { TYPE } from '../../../package/view-design/types'
import { ColorPicker } from 'view-design'
export default {
  name: 'k-' + TYPE.COLOR_PICKER,
  inheritAttrs: false,
  render(h) {
    const { editable, value, _formatter } = this.$attrs
    return (
      editable ? <ColorPicker {...{ props: this.$attrs, on: this.$listeners}}/> : <p>{ _formatter || value }</p>
    )
  }
}