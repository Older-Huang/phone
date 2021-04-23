<template>
  <div class="like-list">
      <van-nav-bar
        title="我的收藏"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        class="b-border"
        fixed
       />
       <main class="container">
           <van-cell
             v-for="product in likeList"
             :key="product.id"
             :title="product.name | formatTitle"
             :icon="product.cover"
             is-link
             :label="'￥' + product.price"
             :to="{path: '/detail', query: {id: product.product_id}}"
            />
       </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likeList: this.$store.state.userInfo.likeList || []
    }
  }
}
</script>

<style lang="less" scoped>
.like-list {
  .container {
    height: calc(100vh - 46px);

    .van-cell {
      margin-top: 10px;

      .van-icon.van-cell__left-icon {
        width: 50px;
        height: 50px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

    
}
</style>