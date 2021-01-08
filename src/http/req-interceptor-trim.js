/**
 * 响应拦截器：
 * - 裁剪请求中params和data上的头尾空值
 *
 * @since 1.0.0
 * @version 1.0.0
 */

/**
 * 响应体日志打印
 * @param {object} body - 响应体
 * @returns {boolean} - 返回布尔值，判断逻辑是否处理成功
 */
export default function trimeResInterceptor(config) {
  config.params = Object.entries(config.params).reduce((map, [key, value]) => {
    if (typeof value === 'string') value = value.trim()

    map[key] = value
    return map
  }, {})

  config.data = Object.entries(config.data).reduce((map, [key, value]) => {
    if (typeof value === 'string') value = value.trim()

    map[key] = value
    return map
  }, {})
}
