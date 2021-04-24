<template>
  <div class="home">
    <van-nav-bar title="精选" class="b-border"
     @click-left="$router.push('/cityselect')"
     @click-right="$router.push('/search')"
    >
      <template #left>
        <van-icon name="location-o" size="18" />
        <span class="location">{{ currentCity }}</span>
      </template>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <main class="container" ref="main" @scroll="mainScroll">
      <template v-if="productList">
        <section class="product-item" 
       v-for="item in productList" 
       :key="item.id" 
       @click="clickItem(item.id)"
      >
        <div class="img">
          <img v-lazy="item.cover" alt="">
        </div>
        <h3 class="title">{{ item.name }}</h3>
        <span class="price">{{ item.price | formatPrice }}</span>
        </section>
      </template>
       <err-page v-else />
    </main>
    <van-icon name="upgrade" class="back-top" v-show="showBackTop" @click="backTop" />
  </div>
</template>

<script>
import { reqProductsData } from 'network/api'
import errPage from 'components/errPage'
import homeProductMixin from "@/mixins/homeProductMixin"

export default {
  name: 'home',
  mixins: [homeProductMixin],
  data() {
    return {
      page: 1,
      totalPages: 1,
      flag: true,
    }
  },
  components: {
    errPage
  },
  methods: {
    async getProductData() {
      this.flag = false;
      const res = await reqProductsData({page: this.page});
      if(!res) {
        this.productList = res;
        return;
      }
      const { data } = res;
      this.totalPages = data.totalPages;
      this.productList.push(...data.data);
      if(this.page > this.totalPages) {
        this.$toast('已没有更多数据！');
        return;
      };
      this.flag = true;
    },
    mainScroll() {
        let { scrollHeight, scrollTop, offsetHeight } = this.$refs.main;
        this.showBackTop = scrollTop > 1500;
        if(scrollHeight - offsetHeight <= scrollTop + 1 && this.flag) {
            this.page ++;
            this.getProductData();
        }
    },
  },
  created() {
    this.getProductData();
  },
  computed: {
    currentCity() {
      return this.$store.state.selectCity;
    }
  }
}
</script>

<style lang="less" scoped>
.b-border {
  position: fixed;
  width: 100vw;
  left: 0;
  top: 0;
}
.location {
  margin-left: 2px;
  font-size: 15px;
}
.container {
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
</style>