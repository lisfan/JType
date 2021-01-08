/**
 * 对post请求头为application/x-www-form-urlencoded类型的数据做序列化处理
 *
 * @since 1.0.0
 * @version 1.0.0
 */

import qs from 'qs'

/**
 * 对post请求头为application/x-www-form-urlencoded类型的数据做序列化处理
 *
 * @param {object} config - http 配置参数
 * @returns {object} 返回更改后的config
 */
export default function bodyReqInterceptor(config) {
  // 注意 Content-Type 的大小写格式
  if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data)
  }

  return config
}
