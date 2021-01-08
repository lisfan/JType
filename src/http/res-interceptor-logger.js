/**
 * 响应拦截器：
 * - 响应体日志打印（仅开发环境会输出）
 *
 *
 * @since 1.0.0
 * @version 1.0.0
 */

/**
 * 响应体日志打印
 * @param {object} body - 响应体
 * @returns {boolean} - 返回布尔值，判断逻辑是否处理成功
 */
export default function loggerResInterceptor(body) {
  const { config } = body

  const method = config.method.toUpperCase()

  console.log(
    'request url: ',
    method,
    config.url,
    '\nrequest ' + (method === 'GET' ? 'params' : 'data') + ': ',
    method === 'GET' ? config.params : config.data,
    '\nresponse body: ',
    body
  )
}
