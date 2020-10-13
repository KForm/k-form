<template>
  <div class="demo">
    {{ form }}
    <keep-form ref="form1"  v-model="schema" :model="form">
      <keep-field
        v-model="form.name1" 
        type="k-input" 
        field="name1" 
        label="name1"
        :ui="{
          disabled:!form.switch,
          $on: { 'on-change': (e) => handler(e) } 
        }"
        :rules="{ required: true, message: '11edasrbg1' }"
      >
        <Icon slot="prefix" type="md-home" />
      </keep-field>
      <keep-field
        :value="form.switch"
        type='k-switch'
        field="switch"
        label="是否禁用name1"
        :ui="{
          $on:{
            'on-change':handleSwitchChange
          }
        }"
      >
        <Icon slot="open" type="md-checkmark"></Icon>
        <template v-slot:close>禁用</template>
      </keep-field>
    </keep-form>
    <KDatePicker/>
    <KTimePicker/>
    <KSwitch/>
    <KAutoComplete/>
    <KSlider/>
    <KInputNumber/>
    <KRate/>
    <KColorPicker/>
    <!-- <KTransfer/> -->
    <KWidget/>
    <KCascader/>
    <KUpload />
  </div>
</template>

<script>

import { preRenderEvent } from '@vuecore/libs/utils'
import KeepForm from '_app/keep-form'
import KDatePicker from '../example/date-picker'
import KTimePicker from '../example/time-picker'
import KSwitch from '../example/switch'
import KAutoComplete from '../example/auto-complete'
import KSlider from '../example/slider'
import KInputNumber from '../example/input-number'
import KRate from '../example/rate'
import KColorPicker from '../example/color-picker'
import KWidget from '../example/widget'
import KCascader from '../example/cascader'
import KUpload from '../example/upload'
export default {
  name: 'Index',
  components: {
    KeepForm: KeepForm.Form,
    KeepField: KeepForm.Field,
    KDatePicker,
    KTimePicker,
    KSwitch,
    KAutoComplete,
    KSlider,
    KInputNumber,
    KRate,
    KColorPicker,
    KWidget,
    KCascader,
    KUpload
  },
  data () {
    return {
      aspectRadio: '16:9',
      schema: {
        form: {
          ui: { labelWidth: 100 }
        },
        fields: [{
          type: KeepForm.TYPE.INPUT,
          field: 'name',
          label: '用户名',
          ui: {
            type: 'number',
            icon: 'ios-contact',
            $slots: [{
              name: 'prefix',
              render: h => <Icon type = {'md-home'} slot = {'prefix'} on-click={(e) => this.handler(e)} />
            }],
            $on: {
              'on-focus': () => console.log('im focus'),
            }
          },
          layout: {
            span: '12'
          },
          rules: {
            required: true,
            message: '请输入'
          }
        }, {
          type: KeepForm.TYPE.TEXT,
          field: 'age',
          label: '年龄',
          layout: {
            span: '12'
          }
        }, {
          type: KeepForm.TYPE.RADIO,
          field: 'sex',
          label: '性别',
          layout: {
            span: '12'
          },
          ui: {
            $data: [{id: 0, name: '女'}, {id: 1, name: '男'}],
            $on: {
              'on-change': e => console.log(e)
            }
          },
          rules: { required: true }
        }, {
          type: KeepForm.TYPE.CHECKBOX,
          field: 'favorite',
          label: '喜好',
          ui: {
            // render支持值和函数，务必使用 function 而不是箭头函数，否则获取不到this
            $data: [{id: 0, name: '苹果', render: function() { return <span><Icon type="md-home"/><span>{ this.name }</span></span>}}, {id: 1, name: '香蕉'}, {id: 2, name: '葡萄'}],
          },
        }, {
          type: KeepForm.TYPE.SELECT,
          field: 'city',
          label: '城市',
          ui: {
            clearable: true,
            $data: { 'city': [{ id: 0, name: 'beijing' }, { id: 1, name: 'tianjin'}, { id: 2, name: 'shanghai' }], 'country': [{ id: 3, name: 'china' }] },
            // $data: [{ id: 0, name: 'beijing' }, { id: 1, name: 'tianjin'}, { id: 2, name: 'shanghai' }]
          },
        },{
          type: KeepForm.TYPE.SWITCH,
          field: 'switch1',
          label: 'switch',
          layout: {
            span: '12'
          },
          rules: {
            required: true,
            message: '请选择switch'
          }
        }]
      },
      form: {
        name: '111',
        age: '18岁',
        name1: '222',
        switch:true,
        switch1:false,
        sex: 1,
        favorite: [1, 2],
        city: 2
      }
    }
  },
  preve () {

  },
  mounted () {
    preRenderEvent()
    setTimeout(() => {
      console.log(this.$refs.form1.$field('city'))
      this.$refs.form1.$field('city').clearSingleSelect()
    }, 5000)
    // console.log(this.$refs.form1.$refs['KeepForm'].validate(valid => console.log(valid)))
  },
  methods: {
    handler(e) {
      console.log(e)
    },
    handleSwitchChange(){
      this.$refs.form1.updateField('name',{label:'12312312'})
    }
  }
}
</script>

<style lang="less" scoped>
@keepcolor: #584f60;
.demo {
  background-color: #f2f2f2;
  padding: 20px;
  box-sizing: border-box;
  color: #333;
  overflow: hidden;
  a {
    color: skyblue;
  }
  button {
    color: #fff;
    background: @keepcolor;
    height: 40px;
    padding: 0 10px;
    border-radius: 20px;
  }
  li + li {
    margin-top: 40px;
  }
  .title {
    font-size: 16px;
    &::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      background: @keepcolor;
      border-radius: 100%;
      margin-right: 10px;
      vertical-align: middle;
    }
  }
  .content {
    margin-top: 12px;
  }
}
</style>
