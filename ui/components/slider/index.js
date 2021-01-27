import { TYPE } from '../../../core/types'

export default {
  name: TYPE.SLIDER,
  inheritAttrs: false,
  render(h) {
    const { editable, range, value, formatter } = this.$attrs
    return (
      editable ? <Slider {...{ props: this.$attrs, on: this.$listeners}}/> : <p>{ formatter || (range ? `${value[0]} ~ ${value[1]}` : value) }</p>
    )
  }
}