/**
 * 小工具集合
 *
 * @version 1.0.0
 *
 */

const dateByZero = function dateByZero(datetimeText, len = 2) {
  return String(datetimeText).padStart(len, '0')
}

// 生成通用唯一识别码
const uuid = function uuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }

  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

// 判断路径中是否包含协议头
const hasProtocol = function hasProtocol(url) {
  return url.match(/^https?/)
}

// 截流函数
// const throttle = function throttle(fn, interval = 30) {
//   // 第一次进行主动触发
//   // 判断是否在截流时间内，如果在，则取消后续操作（如果已经有计时器了，也会让它自动走完）
//   // 如果已超过截流时间，则重新设置一个计时器
//   let timeouterID = null
//   let init = false

//   return function(...args) {
//     // 设置一个标记，指定时间后取消
//     if (timeouterID) return

//     if (!init) {
//       fn.apply(this, args)
//       init = true
//     }

//     timeouterID = setTimeout(() => {
//       fn.apply(this, args)

//       clearTimeout(timeouterID)
//       timeouterID = null
//     }, interval)
//   }
// }

//节流函数，立刻执行，停止触发的时候再执行一次
const throttle = function throttle(func, wait) {
  let timeout
  let context
  let args
  let previous = 0

  let later = function() {
    previous = +new Date()
    timeout = null
    func.apply(context, args)
  }

  return function() {
    let now = +new Date()
    //下次触发 func 剩余的时间
    let remaining = wait - (now - previous)
    context = this
    args = arguments
    // 如果没有剩余的时间了或者你改了系统时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
    } else if (!timeout) {
      timeout = setTimeout(later, remaining)
    }
  }
}

export default {
  dateByZero,
  uuid,
  hasProtocol,
  throttle,
}
