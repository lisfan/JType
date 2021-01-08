/**
 * 响应拦截器：
 * - 移除请求中params和data上为空的值
 *
 * @since 1.0.0
 * @version 1.0.0
 */

/**
 * 响应体日志打印
 * @param {object} body - 响应体
 * @returns {boolean} - 返回布尔值，判断逻辑是否处理成功
 */
export default function removeResInterceptor(config) {
  config.params = Object.entries(config.params)
    // eslint-disable-next-line
    .filter(([key, value]) => {
      return ['', undefined, null].indexOf(value) < 0
    })
    .reduce((map, [key, value]) => {
      map[key] = value
      return map
    }, {})

  config.data = Object.entries(config.data)
    // eslint-disable-next-line
    .filter(([key, value]) => {
      return ['', undefined, null].indexOf(value) < 0
    })
    .reduce((map, [key, value]) => {
      map[key] = value
      return map
    }, {})
}
