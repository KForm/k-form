# UI

> 表单字段组件的属性配置集合

### 属性

兼容 iview 任意表单组件的所有属性，以 `iview.Input` 为例：

```jsx
<k-form  :model="form" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'name',
          label: '姓名：',
          ui: { placeholder: '请输入姓名', size: 'large'  }
        }] 
      }
    }
  }
}
```

等同于：

```jsx
<Input placeholder="请输入姓名" size="large" />
```

### 事件 $on

兼容 iview 任意表单组件的所有事件，以 `iview.Input` 为例：

```jsx
<k-form  :model="form" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'name',
          label: '姓名：',
          ui: { $on: { 'on-change': e => changeHandler(e) }  }
        }] 
      }
    }
  }
}
```

等同于：

```jsx
<Input @on-change="changeHandler" />
```

### 插槽 $slots

兼容 iview 任意支持 solt 的表单组件的所有插槽，以 `iview.Input` 为例：

```jsx
<k-form  :model="form" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'name',
          label: '姓名：',
          ui: { $slots: [{ name: 'prefix', render: h => <Icon type = { 'md-home' } slot = { 'prefix' } /> }]  }
        }] 
      }
    }
  }
}
```

等同于：

```jsx
<Input>
  <Icon type="md-home" />
</Input>
```

### 数据源 $data

以字典表的形式为 checkbox、radio、select 等组件配置数据源

以 `iview.Checkbox` 为例：

```jsx
<k-form :model="form" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.CHECKBOX,
          field: 'favorite',
          label: '喜好：',
          ui: { $data: [{ name: '苹果', id: 1 }, { name: '香蕉', id: 2 }] }
        }] 
      }
    }
  }
}
```

> 除了 name、id 外，$data 还支持其他配置，比如：disabled、render 等等，这些配置取决于组件的类型，请移步至各个组件文档中

### 样式 $style

作用于最终渲染的 iview 表单组件的样式，使用方法同 vue 的 style 属性

```jsx
<k-form  :model="form" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'name',
          label: '姓名：',
          ui: { $style: 'width: 200px;'  }
        }] 
      }
    }
  }
}
```

等同于：

```jsx
<Input style="width: 200px;" />
```

### 类 $class

作用于最终渲染的 iview 表单组件的类，使用方法同 vue 的 class 属性

```jsx
<k-form  :model="form" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'name',
          label: '姓名：',
          ui: { $class: 'my-input'  }
        }] 
      }
    }
  }
}
```

等同于：

```jsx
<Input class="my-input" />
```

### 提醒信息 $tooltip

在字段后方追加 `iview.Tootip` 组件用来解释字段含义，支持 `String` 类型和 `Object` 类型

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'name',
          label: '姓名：',
          ui: { $tooltip: '请输入您的中文姓名'  }
        }] 
      }
    }
  }
}
```

当该属性为 `Object` 类型时，该对象支持配置 `iview.Tooltip` 的所有属性，并额外提供 `$slots` 作为 `iview.Tooltip` 的插槽

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'name',
          label: '姓名：',
          ui: {
            $tooltip: {
              content: '用户名称',
              placement: 'right-end',
              delay: 1000,
              $slots: [{
                name: 'content',
                render: () => '可覆盖前面的 content'
              }, {
                name: 'default',
                render:() => <Icon type = 'md-alert' />
              }]
            }
          }
        }] 
      }
    }
  }
}
```