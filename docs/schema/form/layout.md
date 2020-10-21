# Layout

> 表单整体布局

KForm 最终渲染出来的组件形式如下：

```html
<Form>
  <Col>
    <FormItem>
      <Input/>
    </FormItem>
  </Col>
  <Col>
    <FormItem>
      <RadioGroup>
        <Radio/>
      </RadioGroup>
    </FormItem>
  </Col>
</Form>
```

layout 属性将生效于 Form 下的所有字段的 Col 组件中以完成全局布局

> 支持 `iview.Col` 组件的全部属性

```jsx
<k-form :model="form" v-model="schema"/>
```

```js
export default {
  data() {
    return {
      schema: {
        form: {
          layout: {
            span: '12' // 所有表单字段将遵循 12 栏布局方式
          }
        }
      }
    }
  }
}
```