/**
 * 错误拦截器：请求异常时，对异常错误统一toast提示
 *
 * @since 1.0.0
 * @version 1.0.0
 */

/**
 * 错误拦截器：请求异常时，对异常错误码统一提示
 *
 * @param {object} err - 响应体
 * @returns {boolean} -  返回false时，将提前退出错误拦截
 */
export default function loggerErrorInterceptor(err) {
  // 统一由错误拦截器进行一次前置处理
  const { message, config, response } = err

  console.warn(
    'err message: ',
    message,
    '\nrequest url: ',
    config.method,
    config.url,
    '\nrequest params: ',
    config.method === 'GET' ? config.params : config.data,
    '\nresponse body: ',
    response ? [response] : 'undefined'
  )

  return false
}
