/**
 * 拦截器执行器
 *
 * 维护一个拦截器队列表，将根据上一个拦截器的执行结果，当返回true时表示拦截成功，
 * 不再执行后续的拦截器逻辑
 *
 * @since 1.0.0
 * @version 1.0.0
 */

export class Interceptor {
  $queue = []

  construct() {}

  add(interceptor) {
    this.$queue.push(interceptor)
    return this
  }

  exec(body) {
    return this.$queue.every(interceptor => {
      return !interceptor(body)
    })
  }
}

export default new Interceptor()
