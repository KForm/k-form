# Layout

> 表单整体布局，vant不支持该属性

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

> Gutter

与 `iview.Row.gutter` 不同，该属性将作用于每个 `iview.FormItem` 中，为表单元素添加内边距。

```js
export default {
  data() {
    return {
      schema: {
        form: {
          layout: {
            span: '12',
            gutter: 20
          }
        }
      }
    }
  }
}
```

最终渲染为

```html
<Col span="12">
  <FormItem style="padding: 0 20px;">
    <Input/>
  </FormItem>
</Col>
```