### upload 组件

#### 属性
基于 [Keep 组件上传](https://tech-docs.gotokeep.com/keepfe/#/zh-cn/plugin/upload?id=avue%e6%96%b9%e6%a1%88%ef%bc%9a) 方案进行封装

| 属性        | 类型    |  说明  |
| --------   | -----: | :----: |
| exts   | Array |允许上传的文件格式 |
| mode | String | 上传类型，支持 QINIU/KEEP，默认 QINIU|
| disableDownload | Boolean | 附件是否禁用下载|
| disableDelete | Boolean | 附件是否禁用删除|

#### 事件
| 事件        | 类型    |  返回值  |
| --------   | -----: | :----: |
| on-download   | function |文件信息 |
| on-delete   | function | 文件索引 |

#### 插槽
暂无


#### 示例

```
export default {
  data() {
    return {
      schema: {
        fields: [{
          type: KeepForm.TYPE.UPLOAD,
          field: 'value',
          label: '附件',
          ui:{
            exts: ['png', 'jpg'],
            disableDelete: true,
            $on:{
              'on-download':this.handleDownload
            }
          }
        }]
      }
    }
  }
}
```