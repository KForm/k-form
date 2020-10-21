# Cascader

> iview.Cascader 组件

### 类型

`KForm.TYPE.CASCADER`

### 属性

支持 `iview.Cascader` 的所有属性

### 事件

支持 `iview.Cascader` 的所有事件

### 插槽

支持 `iview.Input` 的所有插槽

### 示例

```js
export default {
  data() {
    return {
      data: [{
        value: 'beijing',
        label: '北京',
        children: [{
          value: 'gugong',
          label: '故宫'
        }, {
          value: 'tiantan',
          label: '天坛'
        }, {
          value: 'wangfujing',
          label: '王府井'
        }]
      }, {
        value: 'jiangsu',
        label: '江苏',
        children: [{
          value: 'nanjing',
          label: '南京',
          children: [{
            value: 'fuzimiao',
            label: '夫子庙',
          }]
        }, {
          value: 'suzhou',
          label: '苏州',
          children: [{
            value: 'zhuozhengyuan',
            label: '拙政园',
          }, {
            value: 'shizilin',
            label: '狮子林',
          }]
        }],
      }],
      schema: {
        form: {
          inject: ['data']
        },
        fields: [{
          type: KForm.TYPE.CASCADER,
          field: 'city',
          label: '城市',
          ui: {
            data: '{{ data }}',
            placeholder: '请选择城市',
            $on: {
              'on-change': (v, sd) => console.log(v, sd)
            }
          }
        }]
      }
    }
  }
}
```