/**
 * 请求拦截器：处理黑白名单
 *
 * @since 1.0.0
 * @version 1.0.0
 */

import _difference from 'lodash/difference'

export default function codeReqInterceptor(config) {
  // 先处理异常错误码黑/白名单
  const { codeWhiteList, codeBlackList } = config.meta

  // 同时存在时白名单和黑名单时，以白名单为准（从白名单中移除黑名单的异常码）
  if (codeWhiteList.length > 0 && codeBlackList.length > 0) {
    config.meta.codeWhiteList = _difference(codeWhiteList, codeBlackList)
    config.meta.codeBlackList = []
  }
}
