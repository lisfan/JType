/**
 * 第三方依赖 配置
 * - 全局性依赖
 * - vue第三方插件注册
 *
 * @since 1.0.0
 * @version 1.0.0
 */

// import 'babel-polyfill' // babel es6 内置对象 新增API 垫片
import 'normalize.css' // reset样式

import erudaLoader from '@/vendors/eruda-loader'
import vantLoader from '@/vendors/vant-loader'
// import sentryLoader from '@/vendors/sentry-loader'
//  import countlyLoader from '@/vendors/countly-loader'

erudaLoader()
vantLoader()
// sentryLoader({
//   dsn: 'https://4f21999c00174a9aad20474e8b2a15a8@sentry.yunyiku.com.cn/6',
// })
