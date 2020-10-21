### Rate 组件

#### 属性

支持 iview Rate 组件的所有属性

#### 事件

支持 iview Rate 组件的所有事件

#### 插槽

支持 iview Rate 组件的所有插槽

#### 示例

```
[{
  type: KeepForm.TYPE.RATE,
  field: 'rate',
  label: '评分',
  ui: {
    character: 'A'
  }
}]

<keep-field :value="form.rate" type="k-rate" field="rate" label="评分" :ui="{ 'show-text': true }" >
  <span style="color: #f5a623;">{{ form.rate }}</span>
</keep-field>
```