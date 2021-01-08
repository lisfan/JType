/**
 * http请求时，loading的计数
 *
 * @since 1.0.0
 * @version 1.0.0
 */

import Http from '@/http'

let counter = 0
let showLoadingTimeouterID = null
let hideLoadingTimeouterID = null
let hasShowLoading = false
const hideLoadingDelayTime = 30

export default {
  /**
   * 显示loading
   * 增加计数器
   *
   * @param {object} config - http 配置参数
   *
   * @returns {undefined}
   */
  start(config) {
    if (!config.meta.showLoading) return false

    clearTimeout(hideLoadingTimeouterID)
    hideLoadingTimeouterID = null

    // loading计数器加1
    counter++

    // 判断是否已存在延迟器，若已存在，则不再复复创建
    const delayTime = config.meta.loadingDelayTime

    // 定时器若已存在，则不再处理lodaing的显示
    if (!showLoadingTimeouterID) {
      if (delayTime > 0) {
        showLoadingTimeouterID = setTimeout(() => {
          Http.loadingStartHandler()
          hasShowLoading = true
        }, delayTime)
      } else {
        Http.loadingStartHandler()
        hasShowLoading = true
      }
    }
  },

  /**
   * 隐藏loading
   * 减少计算器，当减少至0时，隐藏弹窗
   *
   * @param {object} config - http 配置参数
   */
  done(config) {
    if (!config.meta.showLoading) return false

    clearTimeout(hideLoadingTimeouterID)
    hideLoadingTimeouterID = null

    counter--

    // 计数器为0时
    if (counter > 0) return false

    // 如果counter不大0时，则延迟30ms取消（因为可能随时会有新的请求 发起）

    hideLoadingTimeouterID = setTimeout(() => {
      // 设置结束时间
      clearTimeout(showLoadingTimeouterID)
      showLoadingTimeouterID = undefined
      if (hasShowLoading) {
        Http.loadingDoneHandler()
        hasShowLoading = false
      }
    }, hideLoadingDelayTime)
  },
}
