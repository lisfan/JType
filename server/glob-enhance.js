/**
 * @file glob-enhance.js
 * @description glob模块增强，支持传入字符串和数组字符串的路径，还支持exclude不包含匹配路径的配置
 * @author lisfan
 * @date 2020-08-06 10:15:37
 */

const fs = require('fs')
const glob = require('glob')
const _ = require('lodash')
const path = require('path')

module.exports = function globEnhance(options) {
  // 如果options是一个直接的字符串或者字符串数组
  if (!_.isPlainObject(options)) {
    options = { include: options, exclude: [], options: {} }
  }

  const includeList = _.castArray(options.include)

  const filePathLists = includeList.map((includePattern) => {
    includePattern = path.resolve(process.cwd(), includePattern)

    // 如果不含magic特殊字符
    // 再判断指定文件是否存在
    if (!glob.hasMagic(includePattern)) {
      if (!fs.existsSync(includePattern)) {
        return []
      }

      // 再进行常规的文件夹类型还是文件类型判断
      if (fs.statSync(includePattern).isDirectory(includePattern)) {
        includePattern = includePattern + '/**'
      }
    }

    return glob.sync(includePattern, {
      ...options.options,
      ignore: options.exclude,
    })
  })

  return _.uniq(_.flatten(filePathLists))
}
