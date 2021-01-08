/**
 * // 设置 NODE_ENV 的值，将根据构建命令进行指定，无视 --mode 参数的设置
 */

if (process.env.npm_lifecycle_event) {
  if (process.env.npm_lifecycle_event==='build') {
    process.env.NODE_ENV = 'production'
  } else {
    process.env.NODE_ENV = 'development'
  }
}
