/**
 * 获取多页面应用中的主入口文件
 */

const globEnhance = require('./glob-enhance')
const path = require('path')

module.exports = function getEntries(routeMap) {
  // 提取出所有的入口路径
  const pathList = Object.keys(routeMap).map((key) => {
    console.log('key',key,routeMap[key])
    return routeMap[key].ENTRY
  })

  console.log('pathList', pathList)
  // 取得最终的文件（不含目录）
  return globEnhance(pathList).reduce((entriesMap, filePath) => {
    // TIP src/views的存放目录是固定的
    const pathname = filePath.slice(path.resolve(process.cwd(), './src/views').length + 1)
    const parsePath = path.parse(pathname)

    if (parsePath.ext !== '.js') return

    entriesMap[parsePath.dir] = filePath

    return entriesMap
  }, {})
}
