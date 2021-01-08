/**
 * 获取当前git操作者的用户名
 */
const execSync = require('child_process').execSync
const chalk = require('chalk')

try {
  module.exports = execSync('git config user.name').toString().replace(/[\r\n]+/, '')
} catch (e) {
  /* eslint-disable no-console */
  console.error(chalk.red('Please set your username: git config --global user.name "FIRST_NAME LAST_NAME"'))
  process.exit()
}
