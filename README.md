## KeepForm 动态表单

## todolist

- [x] input
- [x] radio
- [x] checkbox
- [x] switch
- [x] select
- [x] autocomplete
- [x] slider
- [x] datepicker
- [x] timepicker
- [x] cascader
- [x] inputnumber
- [x] rate
- [x] upload
- [x] colorpicker
- [x] transfer 暂时不做
- [x] 自定义表单组件
- [x] 表单模式（transfer 不做）
- [x] 表单联动
- [x] 复杂布局
- [ ] 性能优化
- [ ] 代码梳理

## 说明 基于 iview 实现的表单组件，支持布局、校验、配置化渲染等功能。

## 安装

请将本项目克隆至你的项目根目录中并引入即可

```js
import KForm from './k-form'
export default {
  components: {
    KForm: KForm.Form,
    KField: KForm.Field
  }
}
```

详细使用文档请阅读 `docs` 文件夹下的 `md` 文件，或将本项目克隆至本地运行 `docsify serve ./docs` 命令并访问 `http://localhost:3000`