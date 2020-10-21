# Upload

> KeepFe.Upload 组件

具体请参考 [Keep vue 组件上传](https://tech-docs.gotokeep.com/keepfe/#/zh-cn/plugin/upload?id=avue%e6%96%b9%e6%a1%88%ef%bc%9a)

### 属性

支持 `KeepFe.Upload` 的所有属性，`KeepFe.Upload` 的 `onComplete` 属性改为 `on-complete` 事件

额外添加 `canView`、 `canDelete`、`canDownload` 属性

| 事件        | 类型    |  备注  |
| --------   | -----: | :----: |
| canView   | boolean | 是否显示已上传的文件 |
| canDelete   | boolean | 是否可删除 |
| canDownload   | boolean | 是否显示「删除」按钮 |

### 事件

| 事件        | 类型    |  返回值  |  备注  |
| --------   | -----: | :----: |:----: |
| on-complete   | function | 上传结果 res| 上传完成结果，返回 res |
| on-download   | function | 当前文件 key 和 url | 上传附件下载 |

### 示例

```js
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KeepForm.TYPE.UPLOAD,
          field: 'file',
          label: '附件',
          ui: {
            isDrag: true,
            $on: {
              'on-download': e => window.open(e.url)
            }
          }
        }]
      }
    }
  }
}
```