/*
 * 发布脚本
 */

const exec = require('child_process').execSync
const chalk = require('chalk')
const GIT_INFO = require('git-repo-info')()
const argv = require('../server/command') // 导入cli命令帮助

const PACKAGE_CONFIG = require('../package.json')

// 1. 运行构建

exec(`npm run build -- --mode=${argv.mode}`)

console.log(chalk.green('[process] 正在构建代码...'))
console.log(`构建版本：${PACKAGE_CONFIG.version}`)
console.log(`构建目标服务环境：${argv.mode}`)
console.log(`构建目标分支：${GIT_INFO.branch}`)

// 2. 复制dist目录到docs目录
exec(`cp -af dist/ docs/`)


// 2. 只提交构建的dist目录
try {
  exec(`git add docs/ && git commit -m "build: release@${PACKAGE_CONFIG.version}"`)
} catch (e) {
}

console.log(chalk.green('[process] 构建完成，提交发布中...'))

exec('git push')

console.log(chalk.green('[process] 提交发布完！'))
