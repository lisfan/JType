/**
 * 错误拦截器：401状态的特珠处理
 *
 * @since 1.0.0
 * @version 1.0.0
 */

import Http from '@/http'

/**
 * 401状态的特珠处理
 * @param {object} err - 响应体
 * @returns {boolean} -  返回false时，将提前退出错误拦截
 */
export default function authErrorInterceptor(err) {
  // 如果是请求成功，返回数据造成的错误，则不再移除loading
  const { status } = err.response

  if (status === 401) {
    Http.unAuthHandler(err)
    return true
  }

  return false
}
