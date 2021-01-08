/**
 * 获取多页面应用中的主入口文件
 */

const path = require('path')
const APP_CONFIG = require('../app.config')

module.exports = function getRoutes(routeList) {
  let routeMap

  if (routeList === '*') {
    routeMap = APP_CONFIG.ROUTE_MAP
  } else {
    routeMap = routeList.reduce((map, key) => {
      const routeItem = APP_CONFIG.ROUTE_MAP[key]
      if (routeItem) map[key] = APP_CONFIG.ROUTE_MAP[key]

      return map
    }, {})
  }

  return Object.keys(routeMap).reduce((map, routeKey) => {
    const routeItem = routeMap[routeKey]
    const filePath = path.resolve(process.cwd(), routeItem.ENTRY)
    const pathname = filePath.slice(path.resolve(process.cwd(), './src/views').length + 1)
    const parsePath = path.parse(pathname)

    map[parsePath.dir] = routeItem

    return map
  }, {})
}
