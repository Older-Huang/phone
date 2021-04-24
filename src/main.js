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
import { Lazyload } from 'vant'
Vue.use(Vant);
Vue.use(Lazyload, {
  loading: "assets/imgs/loading.gif",
  error: "assets/imgs/loadErr.jpg"
});

Vue.config.productionTip = false

store.dispatch('getUserInfo');
store.dispatch('getCityLocation');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
