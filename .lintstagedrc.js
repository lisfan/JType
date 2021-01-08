module.exports = {
  'src/**/*.{js,ts,vue}': ['vue-cli-service lint', 'git add'],
  'src/**/*.{scss,css,vue}': ['stylelint --fix', 'prettier --write', 'git add'],
}
