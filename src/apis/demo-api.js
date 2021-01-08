/**
 * Demo 示例 接口操作类
 *
 * @module DemoAPI
 * @since 1.0.0
 * @version 1.0.0
 */

import http from './http'

/**
 * @class DemoAPI
 */
export default class DemoAPI {
  /**
   * get 请求示例，RESTful接口规范中的参数替换方式
   *
   * @since 1.0.0
   * @param {object} options - http 请求参数
   * @returns {Promise} - 返回操作后的 Promise
   */
  static getDemoRESTful(options) {
    return http.get({
      ...options,
      url: '/apis/api/clearActivity/specialPage/shareInfo/:id',
    })
  }

  /**
   * get 请求示例
   *
   * @since 1.0.0
   * @param {object} options - http 请求参数
   * @returns {Promise} - 返回操作后的 Promise
   */
  static getDemoParams(options) {
    return http.post({
      ...options,
      url: '/apis/api/clearActivity/sub/secondPage/info',
      params: {
        ...options.params,
      },
    })
  }

  /**
   * post 请求示例
   *
   * @since 1.0.0
   * @param {object} options - http 请求参数
   * @returns {Promise} - 返回操作后的 Promise
   */
  static getDemoPayload(options) {
    return http.post({
      ...options,
      url: '/apis/api/web/getSpecialList',
      data: {
        ...options.data,
      },
    })
  }
}
