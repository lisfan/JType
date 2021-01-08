/**
 * 对post请求头为application/x-www-form-urlencoded类型的数据做解析处理
 *
 * @since 1.0.0
 * @version 1.0.0
 */

import qs from 'qs'

/**
 * 异常错误码统一处理
 *
 * @param {object} body - 响应体
 * @returns {object} -  返回false时，提前退出
 */
export default function bodyErrorInterceptor(body) {
  if (body.config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    body.config.data = qs.parse(body.config.data)
  }

  return false
}
