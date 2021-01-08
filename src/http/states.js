/**
 * 统一管理所有的硬编码状态文本：如自定义异常文本、覆盖接口导常描述（不建议覆盖，异常文本建议由后端统一管理控制）、组件配置项等等
 *
 * [注] 考虑在1处以上的地方使用到相同的状态文本时才抽出，少于一处可以直接写在组件里（但也建议抽出）
 * [注] 对于一些需要特别管理，或者经常会变动的状态或文案也可以抽出
 *
 * @since 1.0.0
 * @version 1.0.0
 */

/**
 * @module states
 * @namespace states
 */
const states = {}

/**
 * 接口请求异常状态描述文本
 *
 * @enum
 *
 * @readonly
 */
states.CODE_MESSAGE = {
  // 网络相关，请求[400, 404, 500, 502, 503, 504]等
  C_NETWORK_1001: '网络繁忙，请尝试刷新或稍后再试',
  // 网络相关
  C_NETWORK_1002: '网络不佳，请稍后重试',
  C_NETWORK_1003: '请求超时，请稍后重试',
  // 接口请求相关
  C_REQUEST_1001: '接口格式错误，请联系管理员解决',
  C_REQUEST_1002: '请求错误，请稍后重试',
  C_REQUEST_1003: '请求中止，请稍后重试',
  C_ORIGIN_1001: '无权跨域，请联系管理员解决',
  C_PARSE_1001: '解码失败，请联系管理员解决',
  C_SERVER_1001: '请求已被停止，请联系管理员解决',
  C_UNKNOW_1001: '未知错误，请联系管理员解决',
  C_UNKNOW_1002: '未知错误，请联系管理员解决',
}

export default {
  /**
   * 返回某空间下的所有数据，或某命名空间的指定数据
   *
   * [注] 这样做是因为使用get方法取值，这样在IDE中会有语法高亮，方便定位
   *
   * @param {string} scope - 取值域
   * @param {string} name - 具体名
   * @returns {*} - 具体值
   */
  get(scope, name) {
    if (name) {
      return states[scope][name]
    }

    return states[scope]
  },
}
