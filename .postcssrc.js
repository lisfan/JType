// https://github.com/michael-ciniawsky/postcss-load-config
const path = require('path')

module.exports = ({ file }) => {
  // 判断条件 请自行调整 我使用的是 mand-mobile ui 没有对vant引入进行测试
  //link https://github.com/youzan/vant/issues/1181
  const dirname = file.dirname.split(path.sep).join('/')

  return {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue: dirname.indexOf('/vant/') === -1 ? 100 : 50, // 对应root-fontsize的字号
        unitPrecision: 8, // 保留的小数点位数
        propList: ['*'], // 要转换为rem的属性，通配符 * 表示所有属性都转化
        selectorBlackList: [/ignore-*/],
        replace: true,
        mediaQuery: false,
        minPixelValue: 0,
      },
    },
  }
}
