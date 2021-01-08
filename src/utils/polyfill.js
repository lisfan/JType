;(function() {
  // 兼容Object.values处理
  if (!Object.values) {
    Object.values = function(obj) {
      console.log('Object.values polyfill')

      if (obj !== Object(obj)) {
        throw new TypeError('Object.values called on a non-object')
      }
      var val = []
      var key
      for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          val.push(obj[key])
        }
      }
      return val
    }
  }

  // 兼容Object.entries处理
  if (!Object.entries) {
    Object.entries = function(obj) {
      console.log('Object.entries polyfill')

      if (obj !== Object(obj)) {
        throw new TypeError('Object.entries called on a non-object')
      }
      var val = []
      var key
      for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          val.push([key, obj[key]])
        }
      }
      return val
    }
  }

  // 兼容padStart处理
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLen, fill) {
      console.log('String.prototype.padStart polyfill')
      const val = this
      const len = val.length
      // 需要添加的长度
      const needAddLen = maxLen - len

      let zeroPrefix = ''

      while (zeroPrefix.length < needAddLen) {
        zeroPrefix += fill
      }

      return zeroPrefix.slice(0, needAddLen) + val
    }
  }

  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(prefix) {
      const val = this
      console.log('String.prototype.startsWith polyfill')
      return val.slice(0, prefix.length) === prefix
    }
  }
})()
