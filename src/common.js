/**
 * 全局应用配置
 * - 指令注册
 * - 过滤器注册
 * - 组件注册
 * - 混入注册
 *
 * 在全局对象上暴露了几个属性
 * - $router（vue-router实例）
 * - $store（vuex实例）
 * - $route（当前路由对象实例）
 *
 * @since 1.0.0
 * @version 1.0.0
 */

import '@/config' // 第三方配置
import '@/assets/styles/main.scss' // ui主题样式
import '@/utils/promise-enhance' // Promise类增强
import '@/assets/fonts/din-tiny/din-medium.css' // DIN字体

import Vue from 'vue'
import components from '@/components'
import filters from '@/filters'
import directives from '@/directives'
import mixins from '@/mixins'

/**
 * 注册vue业务组件/过滤器/指令
 *
 * @param {string} type - 要注册的vue类型
 * @param {object} sets - 要注册的组件选项，键/值对
 */
function register(type, sets) {
  Object.keys(sets).forEach((key) => {
    if (/^mixin$/.test(type)) {
      Vue[type](sets[key])
    } else {
      Vue[type](key, sets[key])
    }
  })
}

// 注册通用组件
register('component', components)

// 注册通用过滤器
register('filter', filters)

// 注册通用指令
register('directive', directives)

// 注册通用混入
register('mixin', mixins)
