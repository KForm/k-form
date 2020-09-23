let bananaName = 'banana'

module.exports = {
  bananaName, // 项目的banana名,
  ABTest: false, // 是否开启 AB 测试
  'app1': {
    bananaName,  // 应用属于哪个banana
    baseUrl: `/${bananaName}/`, // 路由的base路径
    appType: 'spa', // spa, ssr
    title: '架构组cms', // html文档的标题
    entryFile: 'entry.js', // 应用入口扩展文件
    webpackFile: 'pack.js', // webpack的扩展配置文件
    routers: '_list.js', // 路由列表文件名
    stores: '_list.js', // 状态模块列表文件名
    // prerouters: ['', 'demo1/', 'demo2/'], // 需要执行预渲染的路径, ''代表/
    devConfig: { // 本地开发环境配置
      host: 'local.dev.gotokeep.com', // dev模式的域名
      port: 1111, // dev模式的端口
    },
    extConfInfo: {
      delFavIcon: true // 自定义页面的标签图标
    },
    UiLayout: 'iview-admin', // 页面布局样式
    vconsole: false, // 是否在非online环境开启vconsole
    feMonitor: true // 使用新的监控插件plugin-femonitor, 需要安装
  }
}
