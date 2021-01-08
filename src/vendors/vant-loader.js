/**
 * vant组件库 加载器
 *
 * @version 1.0.0
 */
import Vue from 'vue'

import { Toast, Lazyload } from 'vant'

// @TIP 开发者自定义增加，自已使用到过的组件，不分别在各文件当中引用，避免每次引用的麻烦

Vue.use(Toast).use(Lazyload)

export default function vantLoader() {
  Toast.setDefaultOptions({ duration: process.APP.MODAL_DURATION, forbidClick: true })

  // 检测是否支持webp格式，将放置一个参数：Vue.config.supportWebp为true
  Vue.use(Lazyload, {
    filter: {
      webp(listener, options) {
        if (Vue.config && Vue.config.supportWebp !== undefined) return

        Vue.config.supportWebp = options.supportWebp
      },
    },
    attempt: 1,
    lazyComponent: true, // 懒组件
  })

  // mock 挂载一个image节点到空节点，检测wep格式是否支持
  new Vue({
    render(h) {
      return h('img', {
        directives: [{ name: 'lazy' }],
      })
    },
  }).$mount()
}
