import { TYPE } from '../../../package/view-design/types'

export default {
  name: TYPE.RATE,
  inheritAttrs: false,
  render(h) {
    const { editable, disabled, slots } = this.$attrs
    return (
      <Rate {...{ props: { ...this.$attrs, disabled: !editable ? true : disabled }, on: this.$listeners}} >
        { Object.keys(slots).map(item => (
          <template slot = { slots[item].name } >
            { slots[item].render(h) }
          </template>
        )) }
      </Rate>
    )
  }
}