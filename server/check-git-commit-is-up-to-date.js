/**
 * 获取当前git版本
 */
const exec = require('child_process').execSync
const chalk = require('chalk')

try {
  const branchName = exec('git name-rev --name-only HEAD')
    .toString()
    .replace(/[\r\n]+/g, '')

  const remoteBranchName = exec('git rev-parse --abbrev-ref --symbolic-full-name @{u}')
    .toString()
    .replace(/[\r\n]+/g, '')

  const diffText = exec(`git diff ${branchName} ${remoteBranchName}`)
    .toString()
    .replace(/[\r\n]+/g, '')

  if (diffText.length !== 0) {
    console.error(chalk.magenta('正在执行build命令，远程代码与本地代码不同步，请先拉取或提交'))
    process.exit()
  }
} catch (e) {
  /* eslint-disable no-console */
  console.error(chalk.red('Getting revision FAILED. Maybe not a git project.'))
  process.exit()
}
