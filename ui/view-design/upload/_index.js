import { TYPE } from '../../../package/view-design/types'
import Upload from '@vuecore/uiLayouts/iview-admin/components/upload'

export default {
  name: TYPE.UPLOAD,
  inheritAttrs: false,
  methods: {
    handleComplete(res) {
      let v = [...this.$attrs.value, res]
      this.$emit('input', v)
      this.$emit('on-complete',res)
    },
    handleDelete() {
      return index => {
        let v = JSON.parse(JSON.stringify(this.$attrs.value))
        v.splice(index, 1)
        this.$emit('input', v)
      }
    },
    handleDownload() {
      return (item) => {
        this.$emit('on-download', item)
      }
    }
  },
  render(h) {
    const { editable, value, field, canDelete = true, canDownload = true, canView = true } = this.$attrs
    return (
      <div>
        { editable ? 
          <Upload { ...{ props: { ...this.$attrs,onComplete:this.handleComplete },on: this.$listeners, ref: field } }></Upload> : ''
        }
        <div>
          {
            value.map((item,index) => (
              <div style = "display: flex;">
                <p style = "flex: 2; color: #6e6e6e; backgrou-color: #efefef; overflow: hidden; text-overflow: ellipsis; white-space:nowrap; cursor: pointer;"><Icon type = "md-attach" /> { item.key }</p>
                { canView ? <a href = { item.url } target = '_blank' style="width: 20px;"><Icon type = "ios-eye-outline" /></a> : '' }
                { canDelete && editable ? <a onClick = { this.handleDelete(index) } style = "width: 20px;"><Icon type = "ios-trash-outline" /></a> : '' }
                { canDownload ? <a onClick = { this.handleDownload(item) } style = "width: 20px;"><Icon type = "ios-cloud-download-outline" /></a> : '' }
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}