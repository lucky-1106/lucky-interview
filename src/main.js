import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant组件库
import '@/plugins/vant'
// 引入字体图标
import '@/assets/style/iconfont.css'
// 引入屏幕适配
import 'amfe-flexible'
// 引入默认样式
import 'normalize.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
