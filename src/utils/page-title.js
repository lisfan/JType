/**
 * 自定义页面标题
 *
 * @since 1.0.0
 * @version 1.0.0
 */

// import userAgent from '@/utils/user-agent'
// import alipayUtils from '@/utils/alipay'
// import wechatUtils from '@/utils/wechat'

/**
 * 设置页面标题
 * 1. 支付宝有自已的设置标题的方式
 * 2. 微信不直持直接改标题，需要hack方式实现
 * 用于修改页面title, 由于ios微信通过document.title = 'xxx' 修改页面title不会生效
 * 需要通过iframe这样的"黑魔法"来达到效果 [黑线]
 *
 * 这里有几个大坑:
 * 1. iframe的src不能是base64, 必须发出请求才能生效
 *    原来请求的是png,小于8912字节的限制,被base64转化了,现在改成ico,直接与其他图片字体等资源区分开
 * 2. 之前iframe都没有插入document.body,iframe是来打酱油的么?
 * 3. 微信开发者工具这个坑货, 这货首先不支持document.title赋值改标题, 二来连黑魔法都不管用(时好时坏),连微信都不如!!!
 * 4. 你妹的微信开发者工具,坑了我一晚上!
 *
 * @param {string} [title] - 要设置的标题
 * @returns {boolean} 更改标题是否成功
 */
export default function setPageTitle(title) {
  if (!title) {
    return false
  }

  document.title = title
  // if (userAgent.is('wechat')) {
  //   // wechatUtils.setTitle(title)
  // } else if (userAgent.is('alipay')) {
  //   // alipayUtils.setTitle(title)
  //   // alipayUtils.setBarColor(1868754)
  // }

  return true
}
