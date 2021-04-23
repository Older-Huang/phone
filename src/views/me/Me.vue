<template>
  <div class="me">
      <header>
        <div class="img">
          <img :src="imgSrc" alt="">
        </div>
        <template v-if="isLogin">
           <span>{{ nickName }}</span>
        </template>
        <template v-else>
           <span @click="toLogin">登录</span>
        </template>
      </header>
      <main>
        <van-grid>
          <van-grid-item icon="pending-payment" text="待付款" />
          <van-grid-item icon="records" text="待发货" />
          <van-grid-item icon="tosend" text="已发货" />
          <van-grid-item icon="logistics" text="已完成" />
        </van-grid>
        <van-cell title="我的订单" icon="records" is-link to="/orderList" />
        <van-cell title="我的收藏" icon="like-o" is-link to="/likeList" />
        <van-cell title="收货地址" icon="description" is-link :to="{path: '/addressList', query: {from: 'user'}}" />
        <van-cell title="用户设置" icon="setting-o" is-link to="/setting" />
      </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: this.$store.state.userInfo || {},
      imgBase: 'http://192.168.0.129:8360'
    }
  },
  computed: {
    isLogin() {
      return !!(this.userInfo.name || this.userInfo.id);
    },
    imgSrc() {
      return this.isLogin ? (this.userInfo.avatar ? this.imgBase + this.userInfo.avatar : require("assets/imgs/profile.png")) : require("assets/imgs/profile.png");
    },
    nickName() {
      return this.userInfo.nickname;
    }
  },
  methods: {
    toLogin() {
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="less" scoped>
.me {
  header {
    height: 25vw;
    width: 100vw;
    background: #F37D0F;
    display: flex;
    align-items: center;

    .img {
      width: 17vw;
      height: 17vw;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 0 3px rgb(167, 167, 167);
      margin-left: 20px;
      margin-right: 10px;

      img {
        width: 100%;
        height: 100%
      }
    }
    span {
      color: #FFF;
    }
  }
}
</style>