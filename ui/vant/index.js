import Input from './input/index'
import Radio from './radio/index'
import Select from './select/index'
import Upload from './upload/index'
import DatePicker from './datepicker/index'
import TimePicker from './timepicker/index'
import Widget from './widget/index'
import { TYPE } from '../../package/vant/types'

export default {
  [TYPE.INPUT]: Input,
  [TYPE.RADIO]: Radio,
  [TYPE.SELECT]:Select,
  [TYPE.UPLOAD]:Upload,
  [TYPE.DATE_PICKER]:DatePicker,
  [TYPE.TIME_PICKER]:TimePicker,
  [TYPE.Widget]:Widget
}