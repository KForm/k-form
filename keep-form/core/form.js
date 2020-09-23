import { uniqueId } from './utils'

export default class Form {
  constructor(ctx) {
    this.id = uniqueId()
    this.ctx = ctx
    this.refName = `KeepForm-${this.id}`
  }
  getFormRef() {
    return this.ctx.$refs[this.refName]
  }
  validate(cb) {
    this.getFormRef().validate(valid => {
      cb && cb(valid)
    })
  }
  validateField(field, cb) {
    this.getFormRef().validateField(field, valid => {
      cb && cb(field, valid)
    })
  }
  resetFields() {
    this.getFormRef().resetFields()
  }
}