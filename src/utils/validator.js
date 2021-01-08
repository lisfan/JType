/**
 * 表单数据校验器
 *
 * 区别于helper函数里的数据校验，表单类型数据在校验时还需要进行类型转换
 *
 * @version 1.0.0
 *
 */
import helper from './helper'
import type from './type'

export default {
  // 校验不通时的错误提示文案集合
  message: {
    isNumber: '请输入数字',
    isPositive: '请输入大于或等于0的数字',
    isPositiveInteger: '请输入大于或等于0的整数',
    isPhone: '请输入11位正确的手机号码',
    isLegal: '请输入不含特殊字符的内容',
  },
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
  // NaN的值需要排除
  isNumber(val) {
    val = Number(val)
    return !Number.isNaN(val) && type.isNumber(val)
  },
  // 校验是否为正数
  isPositive(val) {
    val = Number(val)
    return this.isNumber(val) && val >= 0
  },
  // 校验是否整数
  isInteger(val) {
    val = Number(val)
    return this.isNumber(val) && helper.isInteger(val)
  },
  isPositiveInteger(val) {
    val = Number(val)

    return this.isPositive(val) && this.isInteger(val)
  },
  // 手机号校验
  isPhone(val) {
    return this.isNumber(val) && val.match(/1\d{10}/)
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
  // 校验是否为正数值类型
  isLength(val) {
    return this.isNumber(val) && val >= 0
  },
  // 校验是否为空字符串或空对象
  isEmpty(val) {
    return (
      (this.isString(val) && val.trim().length === 0) ||
      (this.isPlainObject(val) && JSON.stringify(val) === '{}') ||
      val === null
    )
  },
  // 特殊字符校验
  isLegal(val) {
    return !val.match(
      /[^\s~!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\u4e00-\u9fa5A-Za-z0-9]/g
    )
  },
}
