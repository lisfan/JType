/**
 * 错误拦截器：请求异常时，对异常错误统一toast提示
 *
 * @since 1.0.0
 * @version 1.0.0
 */

import Http from '@/http'

/**
 * 错误拦截器：请求异常时，对异常错误码统一提示
 *
 * @param {object} err - 响应体
 * @returns {boolean} -  返回false时，将提前退出错误拦截
 */
export default function toastErrorInterceptor(err) {
  const { config, data } = err

  if (!config.meta.showToast) {
    return true
  }

  const { codeWhiteList, codeBlackList } = config.meta

  // 如果只存在白名单，则判断code是否在白名单中，如果存在，则忽略
  // 如果只存在黑名单，则判断code是否在黑名单中，如果不存在，则忽略
  // 都不存在时，正常处理

  if (
    codeWhiteList.indexOf(data[process.APP.API.CODE_KEY]) > 0 &&
    codeBlackList.indexOf(data[process.APP.API.CODE_KEY]) < 0
  ) {
    return true
  }

  Http.toastHandler(data[process.APP.API.MESSAGE_KEY] || '未知错误')

  return false
}
