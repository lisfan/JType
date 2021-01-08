/**
 * 用户代理类
 *
 * @version 1.0.0
 *
 *
 * 更新历史
 * - 更改为类的定义方式
 */

/* eslint-disable max-len */
/*
 // 典型特征

 Galaxy S5
 "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36"

 Nexus 6P
 "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36"

 iPhone 6
 "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"

 iPhone 6 Plus
 "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"

 iPad
 "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"

 iPad Pro
 "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"

 wechat-Android
 "Mozilla/5.0 (Linux; Android 6.0; PRO 6 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043128 Safari/537.36 MicroMessenger/6.5.7.1041 NetType/WIFI Language/zh_CN"

 wechat-iOS
 "Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12h143 MicroMessenger/6.5.7 nettype/wifi language"

 alipay-Android
 "Mozilla/5.0 (Linux; U; Android 6.0; zh-CN; PRO 6 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/40.0.2214.89 UCBrowser/11.3.8.909 UCBS/2.10.1.4 Mobile Safari/537.36 Nebula AlipayDefined(nt:WIFI,ws:360|0|3.0) AliApp(AP/10.0.12.042101) AlipayClient/10.0.12.042101 Language/zh-Hans useStatusBar/true"

 alipay-iOS
 Mozilla/5.0 (iPhone; CPU iPhone OS 10_2 like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Mobile/14C92 ChannelId(8) Nebula PSDType(1) AlipayDefined(nt:WIFI,ws:414|672|3.0) AliApp(AP/10.0.12.041333) AlipayClient/10.0.12.041333 Alipay Language/zh-Hans
 */
/* eslint-enable */

const agentRegExp = {
  alipay: /alipayclient/i,
  wechat: /micromessenger/i,
  wxwork: /wxwork/i,
  mobile: /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i,
  ios: /iphone|ipad|ipod/i,
  macOS: /mac os/i,
  android: /android/i,
  // ie: !!/trident|edge/i.test(ua),
  // chrome: !!/chrome/i.test(ua),
  // safari: !!/safari/i.test(ua),
  // firefox: !!/firefox/i.test(ua),
  // opera: !!/opera/i.test(ua),
}
const osVersionRegExp = {
  iphone: /iphone os (\d+)_?(\d+)?_?(\d+)?/i,
  ipad: /cpu os (\d+)_?(\d+)?_?(\d+)?/i,
  android: /android (\d+)\.?(\d+)?\.?(\d+)?/i,
}

const platformVersionRegExp = {
  wechat: /micromessenger\/(\d+)\.?(\d+)?\.?(\d+)?/i,
  alipay: /alipayclient\/(\d+)\.?(\d+)?\.?(\d+)?/i,
}

/**
 * 用户代理类
 *
 * @class
 */
export class UserAgent {
  ua = null // 用户代理字符串
  os = null // 系统类型
  device = null // 设备类型
  platform = null // 平台入口
  osVersion = null // 系统版本号
  osMajorVersion = null // 系统主版本
  osMinorVersion = null // 系统次版本
  osPatchVersion = null // 系统修订版本
  platformVersion = null // 平台版本号
  platformMajorVersion = null // 平台主版本
  platformMinorVersion = null // 平台次版本
  platformPatchVersion = null // 平台修订版本

  /**
   * 构造函数
   *
   * @class
   * @param {string} ua 用户代理字符串
   *
   */
  constructor(ua = navigator.userAgent.toLowerCase()) {
    this.ua = ua

    // 获取当前的设备类型（苹果还是安卓，或其他）
    // 获取当前系统版本
    // 部分浏览器不支持Object.entries
    for (const name in osVersionRegExp) {
      const result = osVersionRegExp[name].exec(this.ua)

      if (result !== null) {
        this.device = name
        this.os = name === 'iphone' || name === 'ipad' ? 'ios' : name
        this.osMajorVersion = Number.parseInt(result[1], 10) // 系统主版本
        this.osMinorVersion = Number.parseInt(result[2] || 0, 10) // 系统次版本
        this.osPatchVersion = Number.parseInt(result[3] || 0, 10) // 系统修订版本
        this.osVersion = `${this.osMajorVersion}.${this.osMinorVersion}.${this.osPatchVersion}` // 系统版本号

        break
      }
    }

    // Object.entries(osVersionRegExp).every(([name, regexp]) => {
    //   const result = regexp.exec(this.ua)
    //
    //   if (result !== null) {
    //     this.device = name
    //     this.os = (name === 'iphone' || name === 'ipad') ? 'ios' : name
    //     this.osMajorVersion = Number.parseInt(result[1], 10) // 系统主版本
    //     this.osMinorVersion = Number.parseInt((result[2] || 0), 10) // 系统次版本
    //     this.osPatchVersion = Number.parseInt((result[3] || 0), 10) // 系统修订版本
    //     this.osVersion = `${this.osMajorVersion}.${this.osMinorVersion}.${this.osPatchVersion}` // 系统版本号
    //     return false
    //   }
    //
    //   return true
    // })

    // 获取当前的平台入口（微信还是支付宝，或其他）
    // 获取当前平台入口的版本
    // 部分浏览器不支持Object.entries
    for (const name in platformVersionRegExp) {
      const result = platformVersionRegExp[name].exec(this.ua)

      if (result !== null) {
        this.platform = name
        // 平台主版本
        this.platformMajorVersion = Number.parseInt(result[1], 10)
        // 平台次版本
        this.platformMinorVersion = Number.parseInt(result[2] || 0, 10)
        // 平台修订版本
        this.platformPatchVersion = Number.parseInt(result[3] || 0, 10)
        // 平台版本号
        this.platformVersion = `${this.platformMajorVersion}.${this.platformMinorVersion}.${this.platformPatchVersion}`

        break
      }
    }

    // Object.entries(platformVersionRegExp).every(([name, regexp]) => {
    //   const result = regexp.exec(this.ua)
    //
    //   if (result !== null) {
    //     this.platform = name
    //     // 平台主版本
    //     this.platformMajorVersion = Number.parseInt(result[1], 10)
    //     // 平台次版本
    //     this.platformMinorVersion = Number.parseInt((result[2] || 0), 10)
    //     // 平台修订版本
    //     this.platformPatchVersion = Number.parseInt((result[3] || 0), 10)
    //     // 平台版本号
    //     this.platformVersion =
    // `${this.platformMajorVersion}.${this.platformMinorVersion}.${this.platformPatchVersion}`  return false } return
    // true })
  }

  /**
   * 判断当前的用户代理
   *
   * @param {string} name - 期望用户代理名称
   * @returns {boolean} 是否为期望用户代理
   */
  is(name) {
    if (name === 'miniprogram') {
      return window.__wxjs_environment === name
    } else if (!agentRegExp[name]) {
      return false
    } else {
      return !!agentRegExp[name].test(this.ua)
    }
  }
}

export default new UserAgent()
