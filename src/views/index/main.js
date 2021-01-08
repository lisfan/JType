import '@/common'
import Vue from 'vue'
import App from './app.vue' // 根组件

new Vue({
  // router,
  render: (h) => h(App),
}).$mount('#app')
