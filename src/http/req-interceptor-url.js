/**
 * 请求拦截器：处理拼接接口请求时的URL的地址
 * - 替换url中的`vars`变量
 * - 拼接host地址
 * - 拼接project地址
 * - 拼接api地址
 *
 * @since 1.0.0
 * @version 1.0.0
 */

import urlUtil from 'url'

const REPLACE_REG = /(:([^/]*))/g

/**
 * 替换urls中的变量
 *
 * @param {string} source - url请求
 * @param {object} [variable] - 要替换变量处的数据
 * @returns {string} - 返回替换变量后新的url请求
 */
const replaceUrlVariable = function replaceUrlVariable(source, variable = {}) {
  return source.replace(REPLACE_REG, (matched, key) => {
    return variable[key.slice(1)]
  })
}

/**
 * 再包装用于发起http请求的选项
 *
 * @param {object} config - http 配置参数
 * @returns {object} 返回更改后的config
 */
export default function APIURLReqInterceptor(config) {
  const urlObj = urlUtil.parse(config.url)

  config.url = replaceUrlVariable(urlObj.path + (urlObj.search || ''), config.vars)
}
