import FeConfig from '@keepfe/plugin-configjs'

let keepConfig = new FeConfig(window.host_env || '', false, false)

let appconfig = keepConfig

appconfig.baseUrl = {
  api: keepConfig.cmsProxy.host,
  qiniuUrl: keepConfig.cmsProxy.host
}

let iviewAdminConfig = { // config.js 的配置内容
  login: { // 登录配置，类型和过期时间，expire只在ldap类型下有效
    type: 'ldap', // ldap, keep
    ldapExpires: '30d'
  },
  appName: 'banana', // 应用的名称，建议用bananaName
  homeName: 'home', // 首页路由名称
  ldapAuth: { // auth中心配置信息
    preSystemId: '', // pre环境的id
    onlineSystemId: '', // 线上环境的id
    hideWithAuth: true // 无权限路由是否隐藏，uiInfo为iview-admin有效
  }
}

Object.assign(appconfig, iviewAdminConfig)
if (appconfig.ldapAuth) {
  if (appconfig.hostEnv === 'online') {
    appconfig.ldapAuth.systemId = appconfig.ldapAuth.onlineSystemId // '线上的systemid'
  } else {
    appconfig.ldapAuth.systemId = appconfig.ldapAuth.preSystemId // '线上的systemid'
  }
}

export default appconfig
