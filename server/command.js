/**
 * 目前仅兼容了微信小程序的id选择
 *
 * @type {_.LoDashStatic | _}
 * @private
 */
const yargs = require('yargs')

const commander = yargs
  .options('m', {
    alias: ['mode'],
    describe: '指定构建的服务环境配置文件',
    demandOption: true,
    choices: ['dev', 'test', 'release', 'prod'],
    default: 'dev',
    type: 'string',
  }).options('mock', {
    describe: '是否启用mock服务',
    demandOption: false,
  })
  .example('npm run serve -- --mode=dev --mock', '开发模式构建，并启用mock服务')
  .example('npm run serve -- --mode=test', '开发模式构建，指向后端服务为预发环境')
  .example('npm run build -- --mode=release', '生产模式构建，指向后端服务为预发环境')
  .example('npm run build -- --mode=release', '生产模式构建，指向后端服务为生产环境')
  .example('npm run eslint', 'js代码质量检查并纠错')
  .example('npm run stylelint ', '样式代码质量检查并纠错')
  .wrap(140)
  .hide('help')
  .hide('version')
  .epilogue('更多内容，请查看项目根目录 README.md 文档')

// 如果是运行了help命令，则显示help
if (process.env.npm_lifecycle_event === 'help') {
  yargs.showHelp()
  return
}

module.exports = commander.argv
