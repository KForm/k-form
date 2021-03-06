import { TYPE } from '../../../package/view-design/types'
import { Slider } from 'view-design'

export default {
  name: 'k-' + TYPE.SLIDER,
  inheritAttrs: false,
  render(h) {
    const { editable, range, value, _formatter } = this.$attrs
    return (
      editable ? <Slider {...{ props: this.$attrs, on: this.$listeners}}/> : <p>{ _formatter || (range ? `${value[0]} ~ ${value[1]}` : value) }</p>
    )
  }
}