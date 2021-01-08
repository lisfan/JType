// https://prettier.io/docs/en/options.html#prose-wrap

module.exports = {
  tabWidth: 2, // 缩进空格位数
  useTabs: false, // 缩进是否使用tab指标符代替空格符
  printWidth: 120, // 每一行的字符长度，超出长度换行
  singleQuote: true, // 是否使用单引号
  quoteProps: 'as-needed', // 对象属性是否使用引号，as-needed=必要情况下需要
  jsxSingleQuote: false, // jsx是否使用单引号
  semi: false, // 语句末尾是否使用分号结尾
  eslintIntegration: true,
  trailingComma: 'es5', // 是否使用尾逗号，ES5=仅支持ES5下的尾逗号
  bracketSpacing: true, // 对象字面量的括号前后保留一个空格
  jsxBracketSameLine: false, // jsx的尾尖括号是否保留在同一行
  vueIndentScriptAndStyle: false, // 是否缩进vue的script和style标签
  endOfLine: 'lf', // 设置行尾样式
  htmlWhitespaceSensitivity: 'ignore',

  // 自定义覆盖某些扩展类型的格式化配置
  // 正常情况下prettier会自动根据文件扩展类型，选择适合的编译器
  // 若有自定义的一些文件扩展类型时，可以通过该配置指定
  // overrides: [
  //   {
  //     files: '*.mpm',
  //     options: {
  //       parser: 'json',
  //     },
  //   },
  //   {
  //     files: ['*.html', 'legacy/**/*.js'],
  //     options: {
  //       tabWidth: 4,
  //     },
  //   },
  // ],
}
