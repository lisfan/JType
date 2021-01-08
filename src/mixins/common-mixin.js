/**
 * 全局通用的混合
 */
export default {
  data() {
    return {
      process: {
        env: process.env,
        APP: process.APP,
        BUILD: process.BUILD,
      },
    }
  },
  computed: {
    // 加强vuex中的调用标记
    $$state() {
      return this.$store.state
    },
    // 加强vuex中的调用标记
    $$getters() {
      return this.$store.getters
    },
    // 加强vuex中的调用标记
    $$dispatch() {
      return this.$store.dispatch
    },
  },
  methods: {
    // 尺寸单位转换
    $$pxTransform(val) {
      return val / 100 + 'rem'
    },
  },
}
