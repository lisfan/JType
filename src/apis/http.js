/**
 * vue 业务相关的局部视图组样配置入口
 * 多处使用到（比如大于2处以上）的地方进行全局注册
 * 否则就单独引入，或者只作为路由视图组件的局部组件引入
 *
 * @since 1.0.0
 * @version 1.0.0
 */

import urlUtil from 'url'
import Http from '@/http'
import { Toast } from 'vant'
import cookie from 'js-cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './nprogress.scss'

NProgress.configure({ showSpinner: false })

const IS_PROD = process.BUILD.SERVER_ENV === 'production' && process.env.NODE_ENV === 'production'

// 写入mock数据
// 非正式服务环境时，可以通过cookie来模拟session
if (!IS_PROD) {
  const urlObj = urlUtil.parse(location.href, true)

  // 匹配到关键词时，可以写入当下的数据
  if (urlObj.query.mock) {
    // 从query中取出token等信息，写入到
    Object.entries(urlObj.query).forEach(([key, value]) => {
      cookie.set(key, value)
      localStorage.setItem(key, value)
    })
  }
}

// 拦截器队列，当返回true时，将直接退出，不再执行后续队列内容
Http.requestInterceptors = [
  // 附加token
  // function (config) {
  //   const token = localStorage.getItem('token')
  //
  //   config.header.Authorization = token
  // },
  // 附加params上的随机时间戳
  function (config) {
    // 是否自定义时间戳
    if (!config.meta.appendTimestamp) return
    config.params._ = Date.now()
  },
]

// 拦截器队列，当返回true时，将直接退出，不再执行后续队列内容
// Http.errorInterceptors = []

Http.toastHandler = function (message) {
  Toast({
    message,
  })
}

Http.loadingStartHandler = function () {
  NProgress.start()
}

Http.loadingDoneHandler = function () {
  NProgress.done()
}

// 有优先保证vue实例已初始化
export default new Http({
  // 小程序叫header，h5中叫headers
  headers: {
    ...(IS_PROD
      ? {}
      : {
          // 开发环境附加
          BUILD_DATE: process.BUILD.BUILD_DATE,
          BUILD_AUTHOR: process.BUILD.BUILD_AUTHOR,
          SERVER_ENV: process.BUILD.SERVER_ENV,
          GIT_BRANCH: process.BUILD.GIT_BRANCH,
          GIT_COMMIT: process.BUILD.GIT_COMMIT,
          GIT_DATE: process.BUILD.GIT_DATE,
        }),
  },
})
