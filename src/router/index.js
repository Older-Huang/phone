import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)

const router = new VueRouter({
  mode:'history',
  routes
})

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

router.beforeEach((to, from, next) =>{
  if(to.meta.isLogin) {
    if(sessionStorage.getItem('token')) {
      next();
    }else {
      next('/login');
    }
  }else {
    next();
  }
})

export default router
