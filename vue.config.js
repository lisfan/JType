require('./server/set-node-env') // 1. 设置NODE_ENV的环境变量
require('./server/check-env-config-path') // 2. 校验本地开发环境配置文件
process.env.NODE_ENV === 'production' && require('./server/check-git-commit-is-up-to-date') // 1. git最新代码的校验

const argv = require('./server/command') // 导入cli命令帮助
const path = require('path')
const dayjs = require('dayjs')
const GIT_INFO = require('git-repo-info')()

const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const getRoutes = require('./server/get-routes')

const ENV_CONFIG = require('./env.config')
const APP_CONFIG = require('./app.config')
const PACKAGE_CONFIG = require('./package.json')

const SERVER_ENV_CONFIG = ENV_CONFIG[argv.mode.toUpperCase()]

// 构建时的一些日志信息
const BUILD_INFO = {
  // 构建日志信息
  BUILD_DATE: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  BUILD_AUTHOR: require('./server/git-username'),
  GIT_COMMIT: GIT_INFO.abbreviatedSha,
  GIT_BRANCH: GIT_INFO.branch,
  GIT_DATE: dayjs(GIT_INFO.committerDate).format('YYYY-MM-DD HH:mm:ss'),
  APP_VERSION: PACKAGE_CONFIG.version,
  SDK_VERSION: PACKAGE_CONFIG.version,

  // 环境变量相关
  ...SERVER_ENV_CONFIG,

  // MOCK服务的地址，生产构建时，强制为API_HOST的地址
  MOCK_API_HOST:
    process.env.NODE_ENV === 'production' || !argv.mock
      ? SERVER_ENV_CONFIG.API_HOST
      : `http://${APP_CONFIG.MOCK_SERVER.HOST}:${APP_CONFIG.MOCK_SERVER.PORT}`,
}

const ROUTE_MAP = getRoutes(
  process.env.NODE_ENV === 'production' || !ENV_CONFIG.ROUTES || ENV_CONFIG.ROUTES.length === 0
    ? '*'
    : ENV_CONFIG.ROUTES,
)

module.exports = {
  // 入口页的配置
  pages: Object.entries(ROUTE_MAP).reduce((map, [pathname, routeItem]) => {
    map[pathname] = {
      entry: routeItem.ENTRY,
      filename: routeItem.BASE ? pathname + '/index.html' : pathname + '.html',
      template: 'public/index.html',
      scriptLoading: 'defer',
      TITLE: routeItem.TITLE,
      ...BUILD_INFO,
    }

    return map
  }, {}),
  // 开发环境配置
  devServer: {
    // 开启内网穿透 Start
    historyApiFallback: {
      rewrites: Object.entries(ROUTE_MAP)
        .filter(([pathname, routeItem]) => {
          return !!routeItem.BASE
        })
        .map(([pathname, routeItem]) => {
          return {
            from: new RegExp('/' + routeItem.BASE + '/'),
            to: '/' + pathname + '/index.html',
          }
        }),
    },
    host: '0.0.0.0',
    disableHostCheck: true,
    noInfo: true,
    // 开启内网穿透 End
    compress: true,
    open: true,
    openPage: 'webpack-dev-server',
    port: SERVER_ENV_CONFIG.PORT || '8080',
    proxy:
      Object.entries(ENV_CONFIG.PROXY).length > 0
        ? Object.entries(ENV_CONFIG.PROXY).reduce((map, [matchPath, rewritePath]) => {
          map[matchPath] = {
            target: SERVER_ENV_CONFIG.API_HOST,
            changeOrigin: true,
            logLevel: 'debug',
            pathRewrite: {
              [matchPath]: rewritePath,
            },
          }
          return map
        }, {})
        : null,
  },
  lintOnSave: false, // 是否开启保存即检测
  publicPath: process.env.NODE_ENV === 'production' ? `./` : '/', // 注最后面的斜线符号
  productionSourceMap: !(SERVER_ENV_CONFIG.SERVER_ENV === 'production' && process.env.NODE_ENV === 'production'),
  crossorigin: 'anonymous', // 控制html标签中css和js的跨域属性
  // css: {
  //   // sourceMap:false, // @TODO css的sourcemap有没有出来
  // },
  configureWebpack(config) {
    // 关闭生产环境console
    if (SERVER_ENV_CONFIG.SERVER_ENV === 'production' && process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }

    const commonPlugins = [
      new webpack.DefinePlugin({
        'process.APP': JSON.stringify(APP_CONFIG),
        'process.BUILD': JSON.stringify(BUILD_INFO),
      }),
      new webpack.ProvidePlugin({
        Mock: 'better-mock',
        // Mock: 'better-mock/dist/mock.mp.js', // 小程序中需要使用此写法
        dayjs: 'dayjs',
        // mapState: ['vuex', 'mapState'], // 引入了vuex的时候
        // mapGetters: ['vuex', 'mapGetters'],
        // mapMutations: ['vuex', 'mapMutations'],
        // mapActions: ['vuex', 'mapActions'],
      }),
    ]

    // if (argv.mock) {
    // commonPlugins.push(
    //   new xxx({
    //     host: APP_CONFIG.MOCK_SERVER.HOST,
    //     port: APP_CONFIG.MOCK_SERVER.PORT,
    //     // 默认读取项目根目录下的/mock目录
    //   })
    // )
    // }

    return {
      resolve: {
        alias: {
          '@': path.join(__dirname, 'src'),
        },
      },
      plugins:
        process.env.NODE_ENV !== 'production'
          ? [...commonPlugins]
          : [
            ...commonPlugins,

            new CompressionWebpackPlugin({
              algorithm: 'gzip',
              test: new RegExp(`\\.(js|css)$`),
              threshold: 10240,
              minRatio: 0.8,
            }),
          ],
    }
  },
  chainWebpack: (config) => {
    // /* config.plugin('preload') */
    // new PreloadPlugin({
    //   rel: 'preload',
    //   include: 'initial',
    //   fileBlacklist: [/\.map$/, /hot-update\.js$/],
    // }),
    //   /* config.plugin('prefetch') */
    //   new PreloadPlugin({
    //     rel: 'prefetch',
    //     include: 'asyncChunks',
    //   }),
    // // 移除 prefetch 插件
    // config.plugins.delete('prefetch-index')
    // // 移除 preload 插件
    // // config.plugins.delete('preload-index')
  },
}
