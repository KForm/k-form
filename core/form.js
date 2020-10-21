import { uniqueId } from './utils'

export default class Form {
  constructor() {
    this.id = uniqueId()
    this.refName = `KForm-${this.id}`
  }
}