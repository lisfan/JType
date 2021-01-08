/**
 * 倒计时器
 *
 * @version 1.0.0
 *
 *
 * 更新历史
 * - 更改为类的定义方式
 */
const _actions = {
  /**
   * 返回向下取整后的时间戳
   *
   * @param {number} [timestamp=Date.now()] - 时间戳
   * @returns {number}
   */
  timestamp(timestamp = Date.now()) {
    return Math.floor(timestamp / 1000) * 1000
  },
  formatDate(self) {
    let timestamp

    if (self.$options.mode === '+') {
      timestamp = self.$options.timestamp - self.$remainTimestamp + self.$timeZoneTimestamp
    } else {
      timestamp = self.$remainTimestamp + self.$timeZoneTimestamp
    }

    const date = new Date(timestamp)

    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate() - 1,
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      milliseconds: date.getMilliseconds(),
    }
  },
}

export class CountDown {
  $options = {}
  $data = {}
  $status = null // 状态值

  $timeZoneTimestamp = new Date().getTimezoneOffset() * 1000 * 60

  $remainTimestamp = undefined

  $throughTimestamp = 0

  $startTimestamp = undefined

  $stopTimestamp = undefined

  $endTimestamp = undefined

  $currentTimestamp = undefined

  _intervalID = undefined

  static options = {
    mode: '-', // 计时模式
  }

  /**
   * 构造函数
   *
   * @class
   * @param options
   */
  constructor(options) {
    const ctor = this.constructor

    this.$options = {
      ...ctor.options,
      ...options,
    }

    this.$status = 'prepare'

    this.$remainTimestamp = _actions.timestamp(this.$options.timestamp)

    this.$date = _actions.formatDate(this)
  }

  // 开始
  start(callback) {
    return new Promise((resolve, reject) => {
      this.$status = 'processing'

      // 记录启动时间时间戳
      this.$startTimestamp = _actions.timestamp()

      // 设置结束时间戳
      this.$endTimestamp = this.$startTimestamp + this.$remainTimestamp

      // 计时函数
      const ticktick = () => {
        // 如果当前已暂停，则停止倒计时
        if (this.$status !== 'processing') {
          return reject(this.$status)
        }

        // 当前的超时时间戳（当currentTimestamp不在startTimestamp和endTmeStamp内时，说明已超时）
        // 倒计时也可能在一些途中超时挂起，导致倒计时没有再走下去，所以每次需要重新捕获
        this.$currentTimestamp = _actions.timestamp()

        this.$remainTimestamp -= 1000
        this.$throughTimestamp += 1000

        // this._logger.log('tick tick...', ((this.$throughTimestamp / 1000) ) + 's')

        if (this.$currentTimestamp > this.$startTimestamp + this.$throughTimestamp) {
          // this._logger.log('超过时间流速，自动修正!')
          // 超过的时间流速
          const lostTime = this.$currentTimestamp - this.$startTimestamp
          this.$remainTimestamp = this.$options.timestamp - lostTime - 1000
          this.$throughTimestamp = lostTime + 1000
        }

        // 计时时间已到达
        if (this.$remainTimestamp < 0) {
          this.$remainTimestamp = 0
          this.$throughTimestamp = this.$endTimestamp - this.$startTimestamp
        }

        this.$date = _actions.formatDate(this)

        // 优先执行回调
        callback(this.$status)

        /* eslint-enable max-len */
        if (this._intervalID && this.$currentTimestamp >= this.$endTimestamp) {
          clearTimeout(this._intervalID)
          this._intervalID = undefined

          this.$status = 'finished'
          resolve(this.$status)
        }
      }

      callback(this.$status)

      this._intervalID = setInterval(() => {
        ticktick()
      }, 1000)
    })
  }

  /**
   * 计时器停止
   */
  stop() {
    clearTimeout(this._timeouter)
    this._timeouter = undefined

    this.$status = 'stoped'
    this.$stopTimestamp = _actions.timestamp()

    return this
  }
}

export default CountDown
