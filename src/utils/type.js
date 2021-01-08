/**
 * 类型校验
 *
 * @version 1.0.0
 *
 */

export default {
  // 返回数据类型
  typeof(val) {
    return Object.prototype.toString
      .call(val)
      .toLowerCase()
      .slice(8, -1)
  },
  // 校验是否为字符串类型
  isString(val) {
    return this.typeof(val) === 'string'
  },
  // 校验是否为数值类型
  isNumber(val) {
    return this.typeof(val) === 'number'
  },
  // 校验是否为布尔值类型
  isBoolean(val) {
    return this.typeof(val) === 'boolean'
  },
  // 校验是否为数组类型
  isArray(val) {
    return this.typeof(val) === 'array'
  },
  // 校验是否为纯对象类型
  isPlainObject(val) {
    return this.typeof(val) === 'object'
  },
  // 校验是否为函数类型
  isFunction(val) {
    return this.typeof(val) === 'function'
  },
  // 校验是否为日期类型
  isDate(val) {
    return this.typeof(val) === 'date'
  },
  // 校验是否为类型
  isError(val) {
    return this.typeof(val) === 'error'
  },
}
