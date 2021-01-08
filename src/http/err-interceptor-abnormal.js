/**
 * 错误拦截器：对所有接口请求返回的异常错误码进行统一的处理
 *
 * @since 1.0.0
 * @version 1.0.0
 */

import Http from '@/http'

/**
 * 异常错误统一处理
 *
 * @param {object} err - 响应体
 * @returns {boolean} -  返回false时，将提前退出错误拦截
 */
export default function abnormalErrorInterceptor(err) {
  const { data, config } = err

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

  // 异常处理后，如果需要再弹toast的，则返回true
  const hasUnauthCode = process.APP.API.UNAUTH_CODE.indexOf(data[process.APP.API.CODE_KEY]) > -1

  if (hasUnauthCode) {
    Http.unAuthHandler(err)
    return true
  } else {
    return false
  }
}
