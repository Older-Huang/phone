<template>
  <div class="err-page container">
      <div class="img">
          <img src="~assets/imgs/err.png" alt="">
          <p>当前网络状态不佳</p>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.container {
    text-align: center;
    vertical-align: middle;
    background: rgb(237, 237, 237);
    margin-top: 0;

    .img{
        width: 100vw;
        position: relative;
    }
    img {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 135px;
        height: 138px;
        transform: translate(-50%, -50%);
    }
    p {
        position: absolute;
        left: 39%;
        top: 64%;
        font-weight: bold;
    }
}
</style>