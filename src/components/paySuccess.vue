<template>
  <div class="pay-success">
      <div class="page">
        <img src="~assets/imgs/success.png" alt="">
        <h3>支付成功</h3>
        <van-button type="primary" @click="$router.push('/home')" block round>返回首页</van-button>
      </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.page {
  width: 100vw;
  height: 100vh;
  position: relative;

  img {
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .van-button {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  h3 {
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-52%, -50%);
    font-size: 20px;
    font-weight: bold;
  }
}
</style>