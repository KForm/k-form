import { TYPE } from '../../../package/view-design/types'
import KeepFeUpload from '@keepfe/plugin-upload'
import './style.less'
import appConfig from '_app/config'
import Cookies from 'js-cookie'
import { Message } from 'view-design'

export default {
  name: TYPE.UPLOAD,
  inheritAttrs: false,
  data() {
    let columns = [
      {
        title: '附件名称',
        render: (h, { row }) => h('a', {
          attrs: {
            href: row.attachmentUrl,
            target: '__blank'
          }
        }, row.attachmentName)
      },
      {
        title: '操作',
        render: (h, { row, index }) => h('div', {}, [
          this.$attrs.disableDownload ? null : <Button type = "primary" size = "small" on-click = { () => this.$emit('on-download', row) } >下载</Button>,
          this.$attrs.disableDelete ? null : <Button type = "error" size = "small" style = "margin-left: 5px;" on-click = { () => this.$emit('on-delete', index)} >删除</Button>
        ]),
        width: 150
      }
    ]
    if(this.$attrs.disableDownload && this.$attrs.disableDelete) {
      columns.pop()
    }
    return {
      columns
    }
  },
  render(h) {
    const { editable, value } = this.$attrs
    return (
      <div class="k-form-upload">
        { 
          editable ? 
            <div class = "upload-container" on-click = { this.handleUpload }>
              <input ref = "upload" class = "upload-input" type = "file" on-change = { this.handleChange } />
              <div >
                <Icon type = "ios-cloud-upload" size = { 52 } color = "#2d8cf0" style = "margin-right: 3px;" />
                <br/>
                <p>点击选择文件</p>
              </div>
            </div> : null
        }
        <div style = "margin-top: 20px;">
          {
            value && value.length ?
              <Table columns = { this.columns } data = { value } /> : editable ? null : <p style = "width: 100%; text-align: center;">暂无附件</p>
          }
        </div>
      </div>
    )
  },
  methods: {
    handleChange(e, fs) {
      let HookMap = new Map()
      HookMap.set('validator', function(fileNode){})
      const authorization = Cookies.get(appConfig.login.ldapCookie)[appConfig.hostEnv + 'LdapAuth']
      let self = this
      const files = fs || this.$refs.upload.files
      let valid = true
      for(let i = 0; i < files.length; i++) {
        if(!self.validateExts(files[i].type)) {
          valid = false
        }
      }
      if(!valid) {
        Message.error('请上传正确格式的文件')
        return
      }
      const msg = this.$Message.loading({
        content: '正在上传...',
        duration: 0
      })
      let Uploader = KeepFeUpload.QiniuUploader
      switch(this.$attrs.mode) {
        case 'KEEP':
          Uploader = KeepFeUpload.KeepUploader
          break
        default:
          Uploader = KeepFeUpload.QiniuUploader
      }
      let uploader = new Uploader({
        callback: {
          'success': function() { console.log(arguments) },
          'error': function(e) { 
            console.log(arguments)
            msg()
            if(e.response && e.response.status === 413) {
              Message.error('文件过大，无法上传')
            }
            else {
              Message.error('附件上传失败')
            }
          },
          'complete': function(res, name) {
            let _value = JSON.parse(JSON.stringify(self.$attrs.value))
            _value.push({
              key: res.key,
              attachmentName: name,
              attachmentUrl: res.url
            })
            self.$emit('input', _value)
            self.$refs.upload.value = ''
            msg()
            Message.success('上传成功')
          },
          'progress': function() { console.log(arguments) }
        },
        extendInfo: {
          'namespace': appConfig.appName,
          'user': this.$store.state._user.userName
        },
        request: {
          mode: 'internal',
          headers: {
            'Authorization': authorization
          },
          file_key: 'file',
          params: {
            'bucket': 'gotokeep'
          }
        },
        rawForm: false,
        processors: HookMap
      })
      uploader.upload(files)
    },
    handleUpload() {
      this.$refs.upload.click()
    },
    validateExts(file) {
      const { exts } = this.$attrs
      if(exts && exts.length) {
        let fileArr = file.split('/')
        let ext = fileArr[fileArr.length - 1]
        if(!exts.includes(ext.toLowerCase())) {
          return false
        }
        else {
          return true
        }
      }
      return true
    },
  },
}