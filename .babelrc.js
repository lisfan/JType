// https://babeljs.io/docs/en/config-files

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [['import', { libraryName: 'vant', libraryDirectory: 'es', style: true }, 'vant']],
}
