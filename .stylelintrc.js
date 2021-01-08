// https://stylelint.io/user-guide/rules

module.exports = {
  extends: 'stylelint-config-standard',
  plugins: [
    // 'stylelint-z-index-value-constraint',
    // 'stylelint-images',
    // 'stylelint-high-performance-animation',
    'stylelint-scss', // 支持scss语法规则
    // 'stylelint-order', // 自动属性排序 --fix
  ],
  rules: {
    'scss/at-rule-no-unknown': [true, { ignoreAtRules: ['b', 'e', 'm'] }], // 启用针对scss的lint
    // 'order/order': [
    //   'custom-properties',
    //   'dollar-variables',
    //   'at-variables',
    //   'declarations',
    //   'rules',
    //   'at-rules',
    // ],
    // 'order/properties-alphabetical-order': true,
    // 'plugin/z-index-value-constraint': {
    //   'min': 1,
    //   'max': 10
    // },
    // 'images/broken': true,
    // 'plugin/no-low-performance-animation-properties': true
    'block-no-empty': null, // 支持类定义空样式
    'no-descending-specificity': null,
    'at-rule-no-unknown': null, // 禁用css的rule检测
    'color-hex-length': 'long',
    'comment-word-blacklist': ['/^@TODO/'], // TODO
    'selector-max-universal': 5, // 限制所有通用选择器的层级
    'number-no-trailing-zeros': true,
    'unit-case': null, // 忽略postcss-pxtorem时对大写PX的特殊要求
    'max-empty-lines': 1, // 限制最多1空行
    // "unit-no-unknown": null, // 小程序单位支持rpx，需要开启此项
    // "selector-type-no-unknown": null // 小程序有自定义的元素标签，需要开启此项
  },
}
