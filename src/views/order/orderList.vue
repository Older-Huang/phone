<template>
  <div class="order-list">
      <van-nav-bar
        title="我的订单"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        class="b-border"
       />
       <main class="container" ref="main" @scroll="mainScroll">
          <van-cell-group v-for="item in orderList" :key="item.id">
            <van-cell
             :title="'订单ID:' + item.id" 
             is-link 
             :to="{path: '/orderInfo', query: {orderId: item.id}}" 
            />
            <van-cell
             v-for="product in item.orderProducts"
             :key="product.id"
             :title="product.name"
             :icon="product.cover"
             is-link
             :to="{path: '/detail', query: {id: product.id}}"
             :value="product.count + '件'"
            />
          </van-cell-group>
       </main>
  </div>
</template>

<script>
import { paginationOrder } from "network/api"
export default {
  name: 'orderList',
  data() {
    return {
      orderList: [],
      page: 1,
      totalPage: 1,
      currScrollTop: 0,
      flag: true
    }
  },
  methods: {
    async getOrderList() {
      this.flag = false;
      const { data } = await paginationOrder();
      this.totalPage = data.totalPages;
      this.orderList.push(...data.data);
      this.flag = true;
    },
    mainScroll() {
      let { scrollHeight, scrollTop, offsetHeight } = this.$refs.main;
      if(this.page == this.totalPage) return;
      if(scrollHeight - offsetHeight <= scrollTop + 1 && this.flag) {
        this.page ++;
        this.getOrderList();
      }
    },
  },
  created() {
    this.getOrderList();
  },
  beforeRouteLeave(to, from, next) {
    this.currScrollTop = this.$refs.main.scrollTop;
    next();
  },
  activated() {
    this.$refs.main.scrollTop = this.currScrollTop;
  }
}
</script>

<style lang="less" scoped>
.order-list {
  .container {
    margin-top: 0;
    height: calc(100vh - 46px);

    .van-cell-group {
      padding-top: 10px;
      background: rgb(244, 244, 244);
    }
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
</style>