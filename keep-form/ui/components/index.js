import Input from './input/index'
import Radio from './radio/index'
import Checkbox from './checkbox/index'
import Select from './select/index'
import AutoComplete from './auto-complete/index'
import Text from './text/index'
import Switch from './switch/index'
import DatePicker from './datePicker/index'
import Slider from './slider/index'
import InputNumber from './input-number/index'
import Rate from './rate/index'
import ColorPicker from './color-picker/index'
import { TYPE } from '../../core/types'

export default {
  [TYPE.INPUT]: Input,
  [TYPE.RADIO]: Radio,
  [TYPE.CHECKBOX]: Checkbox,
  [TYPE.SELECT]: Select,
  [TYPE.AUTO_COMPLETE]: AutoComplete,
  [TYPE.TEXT]: Text,
  [TYPE.SWITCH]: Switch,
  [TYPE.DATEPICKER]:DatePicker,
  [TYPE.SLIDER]: Slider,
  [TYPE.INPUT_NUMBER]: InputNumber,
  [TYPE.RATE]: Rate,
  [TYPE.COLOR_PICKER]: ColorPicker
}