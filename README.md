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
- [x] 代码梳理
- [ ] 性能优化
- [ ] ui 无缝切换

## 说明 

基于 iview、vant-ui 实现的表单组件，支持布局、校验、配置化渲染等功能

## 安装

请将本项目克隆至你的项目根目录中并引入即可

```js
import KeepForm from './k-form'
const KForm = new KeepForm() 
export default {
  components: {
    KForm: KForm.Form,
    KField: KForm.Field
  }
}
```
KeepForm 为一个类，接收一个[string]参数，即，`view-design` 或者 `Vant`。 忽略即可自动区分移动端和PC端（部分差异化属性无法生效）

详细使用文档请阅读 `docs` 文件夹下的 `md` 文件，或将本项目克隆至本地运行 `docsify serve ./docs` 命令并访问 `http://localhost:3000`
