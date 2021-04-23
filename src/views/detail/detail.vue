<template>
  <div class="detail">
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="b-border"
      fixed
    />
    <main class="container">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#39a9ed">
        <van-swipe-item v-for="item in productDetail.imgList" :key="item.id">
          <img :src="item.path" alt="" />
        </van-swipe-item>
      </van-swipe>
      <van-cell :title="productDetail.name" :label="productDetail.price | formatPrice" />
      <van-cell-group>
        <van-cell>
          <van-row>
            <van-col :span="11">免运费</van-col>
            <van-col :span="13">剩余：{{ productDetail.stock || 0 }}</van-col>
          </van-row>
        </van-cell>
        <van-cell>
          <van-row>
            <van-col :span="11">销量：{{ productDetail.sales }}</van-col>
            <van-col :span="13">收藏：{{ productDetail.likes }}</van-col>
          </van-row>
        </van-cell>
      </van-cell-group>
      <van-tabs v-model="active" sticky offset-top="46">
        <van-tab title="图片">
            <img v-for="item in productDetail.detailImgList" :key="item.id" :src="item.path">
        </van-tab>
        <van-tab title="参数">
            <van-cell-group>
                <van-cell v-for="item in productDetail.properties" :key="item.id">
                    <van-row>
                        <van-col :span="11">{{ item.name }}</van-col>
                        <van-col :span="13">{{ item.detail }}</van-col>
                    </van-row>
                </van-cell>
            </van-cell-group>
        </van-tab>
      </van-tabs>
      <van-goods-action class="t-border">
        <van-goods-action-icon :icon="isLike ? 'like' : 'like-o'" 
         
         text="收藏" @click="clickCollection" 
        />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="$router.push('/cart')" />
        <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
        <van-goods-action-button type="danger" text="立即购买" @click="nowBuy" />
      </van-goods-action>
    </main>
  </div>
</template>

<script>
import { reqProductDetail, createLike, reqUserInfo, deleteLike, updateCart } from "network/api";
import locStorage from 'utils/storage/locStorage'

export default {
  data() {
    return {
      productDetail: {},
      active: 0,
      productId: this.$route.query.id,
      isLogin: locStorage.get('token')
    };
  },
  methods: {
    async getProductDetail() {
      const res = await reqProductDetail({ id: this.productId });
      this.productDetail = res.data;
    },
    clickCollection() {
        if(!this.isLogin) {
            this.$router.push('/login');
            return;
        }
        if(this.isLike) {
            deleteLike({product_id: this.productId}).then(() => {
                this.changeLike();
            })
        }else {
            createLike({product_id: this.productId}).then(() => {
                this.changeLike();
            })
        }
    },
    changeLike() {
        reqUserInfo().then(res => {
            this.$store.dispatch('getUserInfo');
        })
    },
    addCart() {
      if(!this.isLogin) {
        this.$router.push('/login');
        return;
      }
      updateCart({product_id: this.productId}).then(res => {
        this.$toast("加入购物车成功！")
      })
    },
    nowBuy() {
      let { id: product_id, name, price, cover} = this.productDetail;
      locStorage.set('orderConfirmList', [{product_id, name, price, cover, count: 1}]);
      this.$router.push('/orderConfirm');
    }
  },
  computed: {
      isLike() {
          if(!this.isLogin) return false;
          return this.$store.state.userInfo.likeList.some(item => Number(item.product_id) == Number(this.productId));
      }
  },
  created() {
    this.getProductDetail();
  },
};
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  img {
    width: 100%;
    height: 300px;
  }
}
.container {
  .van-cell__label {
    color: #f50;
  }
  [class*="van-hairline"]::after {
    border: none;
  }
  .van-cell-group {
    border-bottom: 1px solid #ebedf0;
  }
  .van-tab__pane {
      img {
          width: 100%;
      }
  }
}
.detail /deep/ .van-icon.van-icon-like {
    color: red
}
</style>