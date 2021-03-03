export default {
  inheritAttrs: false,
  render(h){
    let { title } = this.$attrs
    console.log('this.$attrs---------->',this.$attrs)
    return (
      <div class="k-card">
        <div class="card-header">
          <slot name="title">{ this.$slots.title ? this.$slots.title : title }</slot>
          <slot name="extra">{this.$slots.extra ? this.$slots.extra : null}</slot>
        </div>
        <slot>{ this.$slots.default ? this.$slots.default : null} </slot>
      </div>
    )
  }
}