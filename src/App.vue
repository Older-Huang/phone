<template>
  <div id="app">
    <keep-alive include="home,orderList,search">
      <router-view />
    </keep-alive>
    <van-tabbar v-model="active" route v-if="$route.meta.showTabbar" class="t-border">
      <van-tabbar-item icon="star-o" to="/home">精选</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/me">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name:'App',
  data(){
    return {
      active: 0
    }
  }
}
</script>

<style lang="less">
.t-border, .b-border {
  box-shadow: 0 -1px 3px rgb(158, 158, 158);
}
.container {
  height: calc(100vh - 96px);
  overflow-y: scroll;
  margin-top: 46px;
  -webkit-overflow-scrolling: touch;
}
.van-empty__description {
  font-size: 16px !important;
  font-weight: bold;
}
</style>
