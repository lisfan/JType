/**
 * Http 类
 *
 * ## 自定义实例化配置项
 * - timeout - 设置请求超时时间，默认20000ms
 * - forceRequest - 在请求队列中，存在与上一个相同接口地址且相同的请求参数时，
 * 且上一个请求还未请求完成之前，是强制发起新请求还是过滤请求（默认过滤当前请求的发起），
 * 新请求最终调用老请求的结果
 * - abortRequest - 当满足forceRequest时，是否中断上一个请求，默认开启，中断后会返回强制发起的新接口的结果
 * - preventCatch - 当接口请求成功，发返回异常状态码后，错误会一直抛出，是否阻止进入业务自定义异常的逻辑处理，默认不阻止
 *
 * ## 特性
 * - 会将请求时的配置项参数放在response响应体的`body.config`中一起返回给业务开发者
 * - 接口**请求成功**统一结果数据。后端接口请求成功后，code码为0时，会直接返回最终数据，即返回原来`body.data.data`中的数据，业务开发时不需要再进行校验，业务逻辑中大多只需要处理正向逻辑，
 * - 接口**请求失败**统一toast。可通过meta配置项`showToast=false`关闭
 * - 接口**请求失败**统一异常处理。后端接口请求成成功，code码非0时，该模块已经做了一些处理，比如抛出toast提示，比如统一进入异常逻辑处理流程。之后也会将异常抛出，返回一个error对象，
 * 通过`promise.catch`捕获，业务开发者可以再进行针对性处理，response响应体的`body`和请求参数`config`相关数据可以从`error.response`上取得
 * 如果我们已经对异常做了统一处理，但又想只针对性处理，而不走统一处理时，可以在请求时传入配置`meta.codeWhiteList`白名单来控制跳过异常处理
 * - 对请求转台status返回非200时（主要处理了status值为400, 404, 500, 502, 503, 504的），对异常文本提示做了统一优化
 * - 对my.request的请求错误的状态码做了封装，对异常文本提示做了统一优化
 * - 对请求状态status为401无权限的问题，做了统一处理特殊处理(跳至登陆页)
 * - 调整请求超时时间为20秒
 * - params参数增加null，undefined，空字符串的过滤
 *
 * ## meta配置项会提供特性
 * - [已完成]改变请求url中的变量，通过配置`vars`字段
 * - [已完成]异常toast，通过配置`showToast`字段，默认为true
 * - [已完成]请求开始时自动显示loading加载中动画，请求结束时自动关闭loading动画，通过配置`showLoading`，默认为true
 * - [已完成]控制自动显示loading加载中动画的延迟时间，通过配置`loadingDelayTime`，默认为300ms
 * - [已完成]针对新增，编辑，删除等接口操作，在接口执行成功后，自动给出一个反馈，避免重复写这种业务逻辑
 * - [已完成]增加异常状态码的黑名单(codeBlackList)/白名单(codeWhiteList)管理
 *    - 不配置黑/白名单时，所有状态码都会进入err-interceptor-abnormal做默认处理
 *    - 配置白名单列表时，如果当前错误码在白名单中，则不会触发err-interceptor-abnormal里设置的统一异常拦截处理
 *    - 配置黑名单列表时，如果当前错误码在黑名单中，则会触发err-interceptor-abnormal里设置的统一异常拦截处理
 *    - 同时存在黑/白名单时，从比diff黑/白名单，从白名单中从移除黑名单的项，只保留白名单结果
 *
 * @example
 *
 * import http from 'path/to/http'
 *
 * http.post({
 *   url: 'url',
 *   data: {
 *     name: 'msl',
 *     phone: '15868707979'
 *   },
 *   meta: {
 *     showToast: false,
 *   }
 * })
 *
 * http.get({
 *   url: 'url',
 *   params: {
 *     name: 'msl',
 *   },
 *   meta: {
 *     isSilent: true,
 *   }
 * })
 *
 *
 * @since 1.0.0
 * @version 1.0.0
 */

import axios from 'axios'
import _merge from 'lodash/merge'
import states from './states'
import httpLoading from './http-loading'

import { Interceptor } from './interceptor'

// request interceptor queues
import urlReqInterceptor from './req-interceptor-url'
import removeReqInterceptor from './req-interceptor-remove'
import trimReqInterceptor from './req-interceptor-trim'
import codeReqInterceptor from './req-interceptor-code'

// response interceptor queues
import loggerResInterceptor from './res-interceptor-logger'

// error interceptor queues
import loggerErrorInterceptor from './err-interceptor-logger'
import authErrorInterceptor from './err-interceptor-auth'
import abnormalErrorInterceptor from './err-interceptor-abnormal'
import toastErrorInterceptor from './err-interceptor-toast'

// // 解析数据
// axios.defaults.transformResponse = [
//   function (data) {
//     try {
//       return JSON.parse(data)
//     } catch (e) {
//       return data
//     }
//   },
// ]

const _actions = {
  noop() {},
  execRequestInterceptor(body) {
    const requestInterceptor = new Interceptor()

    // 自定义的拦截器悠闲处理
    Http.requestInterceptors.forEach((interceptor) => {
      requestInterceptor.add(interceptor)
    })

    requestInterceptor.add(urlReqInterceptor)
    requestInterceptor.add(removeReqInterceptor)
    requestInterceptor.add(trimReqInterceptor)
    requestInterceptor.add(codeReqInterceptor)

    requestInterceptor.exec(body)
  },
  execResponseInterceptor(body) {
    const responseInterceptor = new Interceptor()

    // 自定义的拦截器悠闲处理
    Http.responseInterceptors.forEach((interceptor) => {
      responseInterceptor.add(interceptor)
    })

    responseInterceptor.add(loggerResInterceptor)

    responseInterceptor.exec(body)
  },
  execErrorInterceptor(err) {
    const errorInterceptor = new Interceptor()

    // 自定义的拦截器悠闲处理
    Http.errorInterceptors.forEach((interceptor) => {
      errorInterceptor.add(interceptor)
    })

    errorInterceptor.add(loggerErrorInterceptor)
    errorInterceptor.add(authErrorInterceptor)
    errorInterceptor.add(abnormalErrorInterceptor)
    errorInterceptor.add(toastErrorInterceptor)

    errorInterceptor.exec(err)
  },
  /**
   * 构建错误的响应体实例
   */
  createResponseError(message = '', code, config, body) {
    message = states.get('CODE_MESSAGE')[code] || message

    // @TODO 这里response是否重复了
    const error = new Error(message)
    error.isCustomError = true // 标记为自定义错误
    error.response = body
    error.config = config
    error.status = 200
    error.data = {
      [process.APP.API.CODE_KEY]: code,
      [process.APP.API.MESSAGE_KEY]: message,
    }

    return error
  },
}

/**
 * Http 类
 *
 * @class Http
 * @param {object} method - 请求方法
 * @param {string} args.url - 请求地址
 * @param {string} args.options - 请求参数
 * @param {object} [args.options.vars] - 替换url请求变量的对象
 * @param {object} [args.options.params] - 放在url的query中的对象
 * @param {object} [args.options.data] - 用于post请求时payload对象
 * @param {object} [args.options.meta] - 自定义数据（如自定义配置是否显示静默不显示菊花，是否启用菊花延迟显示功能等功能）
 */
class Http {
  $options = {} // http实例配置项

  /*
   * 构造函数
   * @constructor
   * @params {object} options - 配置参数
   */
  constructor(options = {}) {
    this.$options = _merge({}, Http.options, options)
  }

  /**
   * 全局配置参数
   * @static
   * @enum
   */
  static options = {
    header: {},
    params: {},
    data: {},
    meta: {
      showToast: true, // 是否显示异常时的toast
      showLoading: true, // 是否显示接口请求时的loading
      loadingDelayTime: 300, // loading延迟显示时间
      codeWhiteList: [], // 白名单
      codeBlackList: [], // 黑名单
      appendTimestamp: false, // 是否支持附加随机时间戳
      // operatorType:'' // 操作者类型，可选值：add，edit，delete
      // operatorText:'' // 操作提示文案
      // preventCodeList: [], // 备用
      // catchCodeList: [], // 备用
      // forceRequest: true, // 备用
      // abortRequest: true, // 备用
      // preventCatch: true, // 备用
    },
    timeout: process.APP.API.TIMEOUT,
  }

  /**
   * 更改默认配置参数
   *
   * @static
   * @param {object} [options={}] - 配置对象
   */
  static config(options = {}) {
    Http.options = _merge(Http.options, options)
  }

  // 自定义请求拦截器，具体业务实现时进行替换
  static requestInterceptors = []

  // 自定义响应拦截器，具体业务实现时进行替换（只处理正确的响应）
  static responseInterceptors = []

  // 自定义错误拦截器，具体业务实现时进行替换
  static errorInterceptors = []

  // 自定义toast处理操作，具体业务实现时进行替换
  static toastHandler = _actions.noop

  // 自定义无权限时处理操作，具体业务实现时进行替换
  static unAuthHandler = _actions.noop

  // 自定义加载中开始效果
  static loadingStartHandler = _actions.noop

  // 自定义操作提示文案
  static operatorText = {
    add: '添加成功',
    edit: '修改成功',
    delete: '删除成功',
  }

  /**
   * http方法调用的统一封装
   *
   * @private
   * @param {string} method - 请求方法
   * @param {object} options - 请求配置
   * @returns {Promise} - 以Promise形式返回请求结果
   */
  _method(method, options) {
    const config = _merge({}, this.$options, options, { method: method })

    // 进行请求拦截处理
    _actions.execRequestInterceptor(config)

    // 处理完毕，发起请求
    httpLoading.start(config)

    return axios(config)
      .then((body) => {
        // 数据合法性校验
        // 非200时的处理，如404错误的处理，小程序中叫statusCode
        if (body.status !== 200 || body.statusText !== 'OK') {
          return Promise.reject(_actions.createResponseError('Http Status Error', 'C_NETWORK_1001', config, body))
        }

        // 后端返回的响应体的完整性校验
        // 否有返回数据，
        // code码是否正确
        if (!body.data) {
          return Promise.reject(_actions.createResponseError('Request Fail', 'C_REQUEST_1001', config, body))
        }

        // code校验是否通过
        // 不通过时，向下抛出错误，由后续处理请求异常时，对描述异常使用Error对象进行封装
        if (body.data[process.APP.API.CODE_KEY] !== process.APP.API.SUCCESS_CODE) {
          return Promise.reject(
            _actions.createResponseError(
              body.data[process.APP.API.MESSAGE_KEY],
              body.data[process.APP.API.CODE_KEY],
              config,
              body
            )
          )
        }

        // 响应拦截器(只处理正确的响应)
        _actions.execResponseInterceptor(body)

        // 所有校验均通过，直接返回最终数据
        return Promise.resolve(body.data[process.APP.API.DATA_KEY])
      })
      .catch((err) => {
        // 如果是自定义生成的错误，则不需要再处理，直接向后抛出
        if (err.isCustomError) return Promise.reject(err)

        let code

        const message = err.message || err.errMsg // 微信里的错误message叫errMsg
        // 匹配err.message的对应信息，若匹配，则重设code
        if (message === 'Network Error') {
          // 网络不佳，请稍后重试
          code = 'C_NETWORK_1002'
        } else if (['Network Timeout', 'request:fail timeout'].indexOf(message) >= 0) {
          // 请求超时，请稍后重试
          code = 'C_NETWORK_1003'
        } else if (message === 'Request Error') {
          // 请求错误，请稍后重试
          code = 'C_REQUEST_1002'
        } else if (message === 'Origin Error') {
          // 无权跨域，请联系管理员解决
          code = 'C_ORIGIN_1001'
        } else if (message === 'Parse Error') {
          // 解码失败，请联系管理员解决
          code = 'C_PARSE_1001'
        } else if (message === 'Server Error') {
          // 请求已被停止，请联系管理员解决
          code = 'C_SERVER_1001'
        } else {
          // 未知错误，请联系管理员解决
          code = 'C_UNKNOW_1001'
        }

        return Promise.reject(_actions.createResponseError(message, code, config, err.response))
      })
      .catch((err) => {
        _actions.execErrorInterceptor(err)

        return Promise.reject(err)
      })
      .finally(() => {
        // 接口请求完毕，关闭加载中状态
        httpLoading.done(config)
      })
  }
}

// 支付宝小程序只支持get和post，不支持'put', 'delete', 'head', 'options', 'patch'
const methods = ['get', 'post', 'put', 'delete', 'options', 'head', 'trace', 'connect']

// 在原型上绑定支持的方法
methods.forEach((method) => {
  Http.prototype[method] = function (...args) {
    return this._method(method, ...args)
  }
})

export default Http
