/**
 * Demo 数据模型类
 *
 * @module DemoModel
 * @since 1.0.0
 * @version 1.0.0
 */

import Vue from 'vue'

/**
 * @class DemoModel
 */
export default class DemoModel extends Vue {
  constructor(data = {}) {
    super({
      data() {
        return {
          id: data.id, // 商家ID
          name: data.name, // 商家名称
          cover: data.cover, // 商家封面
          template: data.template, // 商家模板
        }
      },
      computed: {},
    })
  }
}
