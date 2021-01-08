/**
 * eruda 加载器的载入条件
 *
 * 1. app.config.js中的配置LOADER.ERUDA.DEBUG=1时
 * 2. 路由中带有debug=1的query参数
 * 3. 非生产服务环境（VUE_APP_SERVER_ENV!=='production'）默认同步加载
 * 4. 生产服务环境时，异步加载eruda模块，且延迟3s执行
 *
 * @version 1.0.0
 *
 */

import urlUtils from 'url'

const ERUDA = {
  timeoutID: null,
  handler: null,
  init() {
    // 异步加载
    import(/* webpackChunkName: "eruda" */ 'eruda').then(({ default: eruda }) => {
      const el = document.createElement('div')
      document.body.appendChild(el)

      ERUDA.handler = eruda

      eruda.init({
        container: el,
        tool: ['console', 'elements'],
      })

      // 输出各类环境变量
      console.log('%c[process.env]', 'color:Purple', JSON.stringify(process.env))
      console.log('%c[process.APP]', 'color:Purple', JSON.stringify(process.APP))
      console.log('%c[process.BUILD]', 'color:Purple', JSON.stringify(process.BUILD))
    })
  },
}

export default function erudaLoader(
  options = {
    delay: 3 * 1000, // 生产环境延迟触发时间,
  },
) {
  const { query } = urlUtils.parse(location.href, true)

  // 加载器未启用或在生产环境未配置enable参数
  if (
    !process.APP.LOADER.ERUDA.ENABLE  ||
    (process.BUILD.SERVER_ENV === 'production' && String(query.eruda_enable) !== '1') ||
    ERUDA.handler
  )
    return

  // 如果是非生产服务环境，立即加载
  if (process.BUILD.SERVER_ENV !== 'production' || process.env.NODE_ENV !== 'production') {
    ERUDA.init()
  } else {
    // 若为生产环境，则延迟一定时间加载
    clearTimeout(ERUDA.timeoutID)

    ERUDA.timeoutID = setTimeout(() => {
      ERUDA.init()
    }, options.delay)
  }
}
