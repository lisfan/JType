/**
 * 数据校验
 *
 * @version 1.0.0
 *
 */
import type from './type'

export default {
  // 返回数据类型
  // 校验是否为整数
  isInteger(val) {
    return type.isNumber(val) && !String(val).includes('.')
  },
  // 校验是否为正数值类型
  isLength(val) {
    return type.isNumber(val) && val >= 0
  },
  // 校验是否为空字符串或空对象
  isEmpty(val) {
    return (
      (type.isString(val) && val.trim().length === 0) ||
      (type.isPlainObject(val) && JSON.stringify(val) === '{}') ||
      val === null
    )
  },
}
