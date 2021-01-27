# 表单联动

> KForm 支持众多场景下的表单联动

### 字段关联

字段 a 与 字段 b 相关联，字段 b 与 字段 c 相关联。比如 b 的显隐与取决于 a 的值，c 的 属性值取决于 b 的值

#### 模板字符串

利用 KForm 的模板字符串特性实现联动

```jsx
<k-form :model="form" v-model="schema" />
```

```js
export default {
  data() {
    return {
      schema: {
        form: {
          inject: ['form']
        },
        fields: [{
          type: KForm.TYPE.SELECT,
          field: 'a',
          label: 'a',
          ui: { $data: [{ id: 0, name: 'b 隐藏' }, { id: 1, name: 'b 显示' }] }
        }, {
          type: KForm.TYPE.RADIO,
          field: 'b',
          label: 'b',
          ui: { $data: [{ id: 0, name: 'c 不可用' }, { id: 1, name: 'c 可用' }] },
          hidden: '{{ form.a === 0 }}'
        }, {
          type: KForm.TYPE.INPUT,
          field: 'c',
          label: 'c',
          ui: { disabled: '{{ form.b === 0 }}' }
        }]
      }
    }
  }
}
```

##### 支持模板字符串的属性

* `schema.fields.editable`
* `schema.fields.formatter`
* `schema.fields.hidden`
* `schema.fields.layout/*`
* `schema.fields.label`
* `schema.fields.ui/*`

##### 联动范围

模板字符串目前支持 `String`、`Object`、`Array` 三种范围的联动，见下例：

```js
// 联动一个字符串
ui: {
  disabled: '{{ form.a === form.b }}'
}
```

```js
// 联动一个对象
ui: {
  $style: {
    width: "{{ form.a === form.b ? '100px' : '200px' }}",
    height: "{{ form.a === form.b ? '100px' : '200px' }}"
  }
}
```

```js
// 联动一个数组
ui: {
  $class: ["{{ form.a === form.b ? 'classA' : 'classB' }}', '{{ form.c === form.d ? 'classC' : 'classD' }}"]
}
```

### 调用 Api 修改配置

#### Form.updateField 更新字段规则

(field, option)

({ field1: option, field2: option, ... })

##### 更新单个字段

`this.$refs.form.updateField('name', { label: 'newLabel' })`

`this.$refs.form.updateField('a.a1', { label: 'newa1', ui: { disabled: true } })`

##### 更新多个字段

`this.$refs.form.updateField({ name, { label: 'newLabel' }, 'a.a1': { label: 'newa1' } })`

#### Form.insertField 在指定位置前插入字段

(option/[option1, option2, ...], index/field)

##### 在指定索引前插入字段

`this.$refs.form.insertField({ type: KForm.TYPE.INPUT, label: 'age', field: 'age' }, 0)`

##### 在指定字段前插入字段

`this.$refs.form.insertField({ type: KForm.TYPE.INPUT, label: 'age', field: 'age' }, 'name')`

##### 在指定组/列表前插入字段

`this.$refs.form.insertField({ type: KForm.TYPE.INPUT, label: 'age', field: 'age' }, 'a')`

##### 在指定组/列表内的指定字段前插入字段

`this.$refs.form.insertField({ type: KForm.TYPE.INPUT, label: 'age', field: 'age' }, 'a.a1')`

##### 批量插入多个字段

`this.$refs.form.insertField([{ type: KForm.TYPE.INPUT, label: 'age', field: 'age' }, { type: KForm.TYPE.INPUT, label: 'address', field: 'address' }], 'name')`

#### Form.deleteField 删除字段

(index/field/[index1/field1, index2/field2, ...])

##### 根据索引删除字段

`this.$refs.form.deleteField(0)`

##### 根据字段名删除字段

`this.$refs.form.deleteField('name')`

##### 删除一个组/列表

`this.$refs.form.deleteField('a')`

##### 删除指定组内的指定字段

`this.$refs.form.deleteField('a.a1')`

##### 删除多个字段

`this.$refs.form.deleteField(['a.a1', 'name'])`

请将要删除的字段有序排列

#### Form.updateForm 更新 schema.form 配置

(form)

`this.$refs.form.updateForm({ labelPosition: 'left' })`

#### Field.update 更新该字段规则

(option)

`this.$refs.form.$field('name').update({ label: 'newLabel' })`

#### Field.delete 删除该字段

()

`this.$refs.form.$field('name').delete()`

### 注意 ⚠️

* 上述任一 api 仅支持 v-model 绑定的字段，无法生效于 KField 组件渲染出来的字段
* `Form.(insert/update/delete)Field` 方法在列表布局模式下会作用于数组中的任一列表项

### 同步执行

每个 api 的操作都是异步执行的，当存在多个 api 调用时将会无法保证数据的一致性。为了解决这个问题，每个 api 均返回了 promise，并 resolve 最新的 schema。

```js
export default {
  mounted() {
    this.$refs.form.insertField({
      type: 'k-input',
      label: 'age',
      field: 'age'
    }, 'baseInfo.name').then(res => {
      this.$refs.form.insertField({
        'type': 'k-input',
        label: 'startDate',
        field: 'startDate'
      }, 'pay.endDate').then(res => {
        setTimeout(() => {
          this.$refs.form.deleteField([0, 'baseInfo.age', 'pay.startDate'])
        }, 2000)
      })
    })
  }
}
```