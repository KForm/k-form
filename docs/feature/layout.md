# 布局

> k-form 提供了常见的表单布局方案

### 基本布局

从左到右，从上往下依次陈列各表单项，较简单

```jsx
<k-form :model="{
  a: '',
  b: '',
  c: '',
  d: ''
}" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.INPUT
          field: 'a',
          label: 'a'
        }, {
          type: KForm.TYPE.INPUT
          field: 'b',
          label: 'b'
        }, {
          type: KForm.TYPE.INPUT
          field: 'c',
          label: 'c'
        }, {
          type: KForm.TYPE.INPUT
          field: 'd',
          label: 'd'
        }]
      }
    }
  }
}
```

### 复杂布局

将 schema.fields[n] 包裹一层，提供了 ui、subui、field、type、fields 字段

* ui：支持 `iview.Card` 的所有属性和插槽，同 `schema.fields[n].ui`，新增 $footer（`function`、`component`） 属性用来渲染卡片底部视图
* field：同 `schema.fields[n].field`，分组的 field，组内所有字段将绑定到这个组 field 对象内
* type：可选 `'object'`、`array`、`card`，布局的类型，可选分组模式、列表模式、卡片模式
* fields：字段配置项，同 `schema.fields`
* subui: `array` 模式下生效，可配置每一列表项的卡片属性

#### 分组布局

将若干表单项分成一组

```jsx
<k-form :model="{
  a: {
    a1: '',
    a2: '',
    a3: ''
  }
}" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          ui:{
            title: 'a 组',
            bordered: false
          },
          field: 'a',
          type: 'object',
          fields: [{
            type: KForm.TYPE.INPUT
            field: 'a1',
            label: 'a1'
          }, {
            type: KForm.TYPE.INPUT
            field: 'a2',
            label: 'a2'
          }, {
            type: KForm.TYPE.INPUT
            field: 'a3',
            label: 'a3'
          }]
        }]
      }
    }
  }
}
```

#### 列表布局

以列表的形式呈现表单

```jsx
<k-form :model="{
  a: [{
    a1: '',
    a2: '',
    a3: ''
  }, {
    a1: '',
    a2: '',
    a3: ''
  }]
}" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          ui: {
            title: 'a 列表',
            bordered: false
          },
          subui: {
            title: '子列'
          },
          field: 'a',
          type: 'array',
          fields: [{
            type: KForm.TYPE.INPUT
            field: 'a1',
            label: 'a1'
          }, {
            type: KForm.TYPE.INPUT
            field: 'a2',
            label: 'a2'
          }, {
            type: KForm.TYPE.INPUT
            field: 'a3',
            label: 'a3'
          }]
        }]
      }
    }
  }
}
```

#### 卡片布局

将独立的几个字段用卡片包裹起来，同 `object` 类型，却不需改变数据结构

```jsx
<k-form :model="{
  a: {
    a1: '',
    a2: '',
    a3: ''
  }
}" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          ui:{
            title: 'a 组',
            bordered: false
          },
          type: 'card',
          fields: [{
            type: KForm.TYPE.INPUT
            field: 'a1',
            label: 'a1'
          }, {
            type: KForm.TYPE.INPUT
            field: 'a2',
            label: 'a2'
          }, {
            type: KForm.TYPE.INPUT
            field: 'a3',
            label: 'a3'
          }]
        }]
      }
    }
  }
}
```

#### 综合布局

```jsx
<k-form :model="{
  a: '',
  b: {
    b1: '',
    b2: ''
  },
  c: [{
    c1: '',
    c2: ''
  }, {
    c1: '',
    c2: ''
  }]
}" v-model="schema">
```

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KForm.TYPE.INPUT,
          field: 'a',
          label: 'a'
        }, {
          type: 'object',
          field: 'b',
          ui: {
            title: 'b 信息组'
          }
          fields: [{
            type: KForm.TYPE.INPUT,
            field: 'b1',
            label: 'b1'
          }, {
            type: KForm.TYPE.INPUT,
            field: 'b2',
            label: 'b2'
          }]
        }, {
          type: 'array',
          field: 'c',
          ui: {
            title: 'c 信息组',
            $footer: h => <Button onClick = { () => this.form.c.push({ c1: '', c2: '' }) }>新增</Button>
          },
          subui: {
            $slots: [{
              name: 'title',
              render: (h, index) => <p>c 信息组 {index + 1}</p>
            }, {
              name: 'extra',
              render: (h, index) => <Button onClick = { () => this.form.c.splice(index, 1) } >删除</Button>
            }],
          },
          fields: [{
            type: KForm.TYPE.INPUT,
            field: 'c1',
            label: 'c1'
          }, {
            type: KForm.TYPE.INPUT,
            field: 'c2',
            label: 'c2'
          }]
        }, {
          type: 'card',
          ui: {
            title: 'd 信息组'
          }
          fields: [{
            type: KForm.TYPE.INPUT,
            field: 'd1',
            label: 'd1'
          }, {
            type: KForm.TYPE.INPUT,
            field: 'd2',
            label: 'd2'
          }]
        }]
      }
    }
  }
}
```