/**
 * token 请求头附加
 *
 * @since 1.0.0
 * @version 1.0.0
 */

// import router from '@/router'

// 不需要验证权限的接口地址列表
const unAuth = []
/**
 * token请求头附加
 *
 * @param {object} config - http 配置参数
 * @returns {object} 返回更改后的config
 */
export default function tokenReqInterceptor(config) {
  // 设置token
  const token = (config.headers && config.headers.token) || window.localStorage.getItem('token') || ''
  config.headers.token = token

  if (token) {
    return config
  } else if (unAuth.indexOf(config.url) === -1) {
    return config
  } else {
    // const base = router.history.base

    // 刷新浏览器，清空单例树
    // location.assign(`${base}`)

    console.error('token undefined')
  }
}
