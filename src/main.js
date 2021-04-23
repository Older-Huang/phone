import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入共公样式
import "assets/css/reset.css"
import './utils/filter'

//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.config.productionTip = false

store.dispatch('getUserInfo');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
