<template>
  <div class="search">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="b-border"
      fixed
    >
      <template #title>
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          @input="searchInput"
          :clearable="false"
        />
      </template>
    </van-nav-bar>
    <main class="container" ref="main" @scroll="mainScroll">
      <section
        class="product-item"
        v-for="item in productList"
        :key="item.id"
        @click="clickItem(item.id)"
      >
        <div class="img">
          <img  v-lazy="item.cover" alt="">
        </div>
        <h3 class="title">{{ item.name }}</h3>
        <span class="price">{{ item.price | formatPrice }}</span>
      </section>
    </main>
    <van-icon
      name="upgrade"
      class="back-top"
      v-show="showBackTop"
      @click="backTop"
    />
  </div>
</template>

<script>
import { reqProductsData } from "network/api";
import homeProductMixin from "@/mixins/homeProductMixin";
export default {
  name: "search",
  mixins: [homeProductMixin],
  data() {
    return {
      value: "",
      timer: null,
      page: 1,
      totalPage: 1,
      flag: true,
    };
  },
  methods: {
    async getProductData() {
      this.flag = false;
      const { data } = await reqProductsData({
        page: this.page,
        key: this.value,
      });
      this.totalPage = data.totalPages;
      this.productList.push(...data.data);
      this.flag = true;
    },
    searchInput() {
      clearTimeout(this.timer);
      this.productList = [];
      this.page = 1;
      this.timer = setTimeout(() => {
        this.getProductData();
      }, 1000);
    },
    mainScroll() {
      let { scrollHeight, scrollTop, offsetHeight } = this.$refs.main;
      this.showBackTop = scrollTop > 1500;
      if(this.page == this.totalPage) return this.$toast("没有更多数据！");
      if (
        scrollHeight - offsetHeight <= scrollTop &&
        this.flag &&
        this.page < this.totalPage
      ) {
        this.page++;
        this.getProductData();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  .container {
    height: calc(100vh - 46px);
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
    flex-wrap: wrap;

    .product-item {
      width: 46vw;
      box-shadow: 0 0 3px 1px rgb(202, 201, 201);
      border-radius: 4px;
      margin: 5px 0;
      overflow: hidden;
      padding: 0 3px 10px;
      max-height: 230px;

      .img {
        width: 100%;
        min-height: 46vw;

        img {
          width: 100%;
        }
        .van-image {
          width: 100%;
          height: 46vw;
        }
      }
      .title {
        font-size: 14px;
        line-height: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
      }
      .price {
        font-size: 13px;
        color: #f50;
      }
    }
  }
  .back-top {
    position: fixed;
    right: 20px;
    bottom: 70px;
    font-size: 50px;
    color: rgb(110, 110, 110);
  }
}
.search /deep/ .van-search {
  padding: 5px 12px;
}
</style>