<template>
  <div>
    <keep-form ref="form1" :model="form" :schema="schema">
      <keep-field
        v-model="form.name1" 
        type="k-input" 
        field="name1" 
        label="用户2"
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
        label="是否禁用用户2"
      >
        <Icon slot="open" type="md-checkmark"></Icon>
        <Icon slot="close" type="md-close"></Icon>
      </keep-field>
    </keep-form>
  </div>
</template>

<script>
import KeepForm from '_app/keep-form'
export default {
  name: 'Index',
  components: {
    KeepForm: KeepForm.Form,
    KeepField: KeepForm.Field
  },
  data () {
    return {
      aspectRadio: '16:9',
      form: {
        name: '111',
        age: '18岁',
        name1: '222',
        switch:true,
        switch1:false,
        sex: '',
        favorite: [],
        city: ''
      }
    }
  },
  computed:{
    schema(){
      return {
        form: {
          labelWidth: 200
        },
        fields: [
          {
            type: KeepForm.TYPE.INPUT,
            field: 'name',
            label: '用户1',
            ui: {
              disabled:!this.form.switch1,
              type: 'number',
              icon: 'ios-contact',
              $slots: [{
                name: 'prefix',
                render: h => <Icon type = {'md-home'} slot = {'prefix'} />
              }],
              $on: {
                'on-focus': () => console.log('im focus'),
              }
            },
            rules: {
              required: true,
              message: '请输入'
            }
          },
          {
            type: KeepForm.TYPE.SWITCH,
            field: 'switch1',
            label: '是否禁用用户1',
            ui:{
              $slots:[
                {
                  name:'open',
                  render:h => <Icon slot="open" type="md-checkmark" />
                },
                {
                  name:'close',
                  render:h => <Icon slot="close" type="md-close" />
                }
              ]
            }
          }
        ]
      }
    }
  },
  methods: {
    handler(e) {
      console.log(e)
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
