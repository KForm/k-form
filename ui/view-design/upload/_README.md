### upload 组件

#### 属性
支持keepfe vue组件上传属性 具体请参考 [Keep vue 组件上传](https://tech-docs.gotokeep.com/keepfe/#/zh-cn/plugin/upload?id=avue%e6%96%b9%e6%a1%88%ef%bc%9a)

其中将onComplete 属性改为 on-complete事件，详情请参考事件

额外添加以下属性

| 属性        | 类型    |  说明  |
| --------   | -----: | :----: |
| exts   | Array |允许上传的文件格式 |

#### 事件
| 事件        | 类型    |  返回值  |
| --------   | -----: | :----: |
| on-download   | function |文件信息 |
| on-delete   | function | 文件索引 |

#### 插槽
暂无


#### 示例

```
 fields: [{
  type: KeepForm.TYPE.UPLOAD,
  field: 'value2',
  label: '附件2',
  ui:{
    $on:{
      'on-download':this.handleDownload
    }
  }
}]
 <keep-field 
  :value="form.value"  
  field="value"  
  type="k-upload"
  label="附件"
  :ui="{
    $on:{
      'on-complete':handleComplete
    }
  }"
>
</keep-field>
```