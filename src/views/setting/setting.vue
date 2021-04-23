<template>
  <div class="user-setting">
      <van-nav-bar
        title="用户设置"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        class="b-border"
       />
       <main class="container">
          <van-cell-group title="基本信息">
            <van-cell title="修改昵称" icon="setting-o" is-link to="/setNickName" />
            <van-cell title="修改头像" icon="setting-o" is-link to="/setAvatar" />
          </van-cell-group>
          <van-cell-group title="安全">
            <van-cell title="修改登录密码" icon="setting-o" is-link to="/setLoginPassword" />
            <van-cell title="修改支付密码" icon="setting-o" is-link to="/setPayPassword" />
          </van-cell-group>
       </main>
       <van-button type="info" size="large" @click="show = true">退出登录</van-button>
       <van-popup v-model="show">
         <p>确认退出登录？</p>
         <van-button type="primary" @click="clickConfirm">确认</van-button>
         <van-button type="info" @click="show = false">取消</van-button>
       </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    clickConfirm() {
      this.$store.commit('changeUserInfo', {});
      sessionStorage.clear();
      this.$router.replace('/home');
    }
  }
}
</script>

<style lang="less" scoped>
.user-setting {
  .container {
    margin-top: 0;
  }
}
.user-setting /deep/ .van-popup.van-popup--center {
  padding: 20px;
  width: 200px;
  height: 90px;
  border-radius: 5px;
  line-height: 30px;
  text-align: center;

  .van-button--primary {
    margin-right: 40px;
  }
}
</style>