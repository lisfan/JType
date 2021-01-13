## 在线访问

[日文打字学习web版](https://lisfan.github.io/JType/)

## 特性 - feature

- 每次随机生成用于练习的字符列表
- 可自定义选择的单课程或多个课程
- 记忆上一次练习所选择的课程列表
- 支持假名预览及对应来源汉字，以及联想
- 自动判定输入内容是否正确
- 打字耗时与速度统计

## 清单 - todo

1. 更新框架为单页面架构，并且引入antd组件库
1. 优化新手引导
  1. 增加键位图按健引导
  2. 错误提示，给出正确的解法
1. 增加功能配置弹窗
1. 增加课程选择弹窗
1. 增加新版本更新通知弹窗
1. 增加连打模式，不重置速度和耗时
1. 增加成绩单报告功能（连打模式下才有），汇报本次联系所有打的字的对照情况，以及得分
1. 加入正确或失败的声音提示
1. 增加单词练习模式
  1. 支持连打模式
  1. 预置单词
  1. 自定义单词
1. 移动端兼容

## 更新历史 - changelog

### v0.1.4 - 2021-01-13

1. [PERFORMANCE] 引入chance随机数生成库

### v0.1.3 - 2021-01-09

1. [STYLE] 调整样式，使得50音练习能一次进行三行
1. [FEATURE] 当第一次发生错误时，即使后续修复正确，也会有醒目色提示

### v0.1.2 - 2021-01-08

1. [FEATURE] し、ち、つ增加多种类型罗马字标记
2. [FEATURE] 增加耗时，打字速度统计
3. [FEATURE] 支持连续字符输入（不再只能单个单个字符的输出）
4. [FEATURE] 浏览器半持久化缓存上一次选择的课程

### v0.1.1 - 2021-01-07

1. [FEATURE] 课程选择方式从单多改为多选，支持多课程参与随机

### v0.1.0 - 2021-01-07

4. [FEATURE] 提供字符辅助预览，以及对应的平/片假名，衍化的草书/楷书字符来源，以及记忆联想
