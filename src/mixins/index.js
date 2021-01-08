/**
 * vue 业务相关的局部mixin配置入口
 * 多处使用到（比如大于2处以上）的地方进行全局注册
 * 否则就单独引入，或者只作为路由视图组件的局部组件引入
 */

// 基于vant组件继承或扩展

import CommonMixins from './common-mixin'

export default {
  CommonMixins,
}
