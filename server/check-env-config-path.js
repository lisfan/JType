/**
 * 检测env.config.js是否存在，若不存在，则手动创建一份
 */

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const ENV_CONFIG_EXAMPLE_PATH = path.resolve(__dirname, '../env.config.example.js')
const ENV_CONFIG_PATH = path.resolve(__dirname, '../env.config.js')

// 如果文件不存在，则直接进行创建
if (!fs.existsSync(ENV_CONFIG_PATH)) {
  console.log(chalk.red('根目录下env.config.js不存在，自动创建，若开发者需要更改开发环境配置，请修改该文件\n'))
  fs.copyFileSync(ENV_CONFIG_EXAMPLE_PATH, ENV_CONFIG_PATH)
  // 不退出
}
