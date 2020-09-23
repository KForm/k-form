import Input from './input/index'
import Radio from './radio/index'
import Checkbox from './checkbox/index'
import Select from './select/index'
import Text from './text/index'
import { TYPE } from '../../core/types'

export default {
  [TYPE.INPUT]: Input,
  [TYPE.RADIO]: Radio,
  [TYPE.CHECKBOX]: Checkbox,
  [TYPE.SELECT]: Select,
  [TYPE.TEXT]: Text
}