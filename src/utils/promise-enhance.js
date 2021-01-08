/* eslint-disable */

/**
 * Promise类 增加两个api:done()和finally()
 *
 * ## 更新日志
 * ### [2017.08.21]
 * - 提供`abort([callback])`方法断后续resolved或rejected的执行
 *
 * @since 1.0.0
 * @version 1.1.0
 */

// 返回this
function noop() {
  return function () {
    return this
  }
}

// 接替promise实例的一个假对象
const _FAKE_INSTANCE_ = {}

Object.assign(_FAKE_INSTANCE_, {
  then: noop.call(_FAKE_INSTANCE_),
  catch: noop.call(_FAKE_INSTANCE_),
  done: noop.call(_FAKE_INSTANCE_),
  finally: noop.call(_FAKE_INSTANCE_),
  abort: noop.call(_FAKE_INSTANCE_)
})

Promise.prototype.done = function (onFulfilled, onRejected) {
  this.then(onFulfilled, onRejected).catch((reason) => {
    throw reason
  })
}

Promise.prototype.finally = function (callback = () => {
}) {
  let P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  )
}

/**
 * 禁止将错误抛出到控制台，主动性的抑制
 */
Promise.prototype.catchError = function () {
  return this.catch(() => {})
}

/**
 * 中断promise
 */
Promise.prototype.abort = function (callback) {
  this.finally(callback)

  return _FAKE_INSTANCE_
}
