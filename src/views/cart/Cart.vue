<template>
  <div class="cart">
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="b-border"
      fixed
    />
    <main class="container">
      <template v-if="cartList.length > 0">
        <section
          class="cart-item"
          v-for="item in cartList"
          :key="item.product_id"
        >
          <van-checkbox
            v-model="item.checked"
            @click="clickChecked(item)"
          ></van-checkbox>
          <van-card :title="item.name" :thumb="item.cover">
            <template #desc>
              <span>￥</span>
              <span class="price">{{ item.price }}.</span>
              <span>00</span>
            </template>
            <template #footer>
              <van-stepper
                v-model="item.count"
                @plus="plus(item)"
                @minus="minus(item)"
                @blur="blur(item)"
              />
              <van-button
                type="danger"
                @click="deleteCartItem(item)"
                size="small"
                >删除</van-button
              >
            </template>
          </van-card>
        </section>
      </template>
      <template v-else>
        <van-empty
          class="custom-image"
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="您的购物车为空"
        />
      </template>
    </main>
    <van-submit-bar
      class="t-border"
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
      :disabled="totalCount == 0"
    >
      <template #default>
        <span class="total">共计:{{ totalCount }}件</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { reqCartAll, updateCart, deleteCart } from "network/api"
import locStorage from 'utils/storage/locStorage'

export default {
  data() {
    return {
      cartList: []
    }
  },
  methods: {
    onSubmit() {
      const selectList = this.cartList.filter(item => item.checked);
      locStorage.set('orderConfirmList', selectList);
      this.$router.push('/orderConfirm');
    },
    async getCartList() {
      const { data } = await reqCartAll();
      this.cartList = data || [];
    },
    clickChecked(item) {
      this.updateCartList(item);
    },
    async updateCartList(item) {
      let { product_id, count, checked } = item;
      const { data } = await updateCart({
        product_id,
        count,
        checked: checked ? 1 : 0,
      });
      this.cartList = data;
    },
    plus(item) {
      item.count++;
      this.updateCartList(item);
    },
    minus(item) {
      item.count--;
      if (item.count == 0) item.count = 1;
      this.updateCartList(item);
    },
    blur(item) {
      this.updateCartList(item);
    },
    async deleteCartItem(item) {
      const { product_id } = item;
      const { errcode } = await deleteCart({ product_id });
      if (errcode == 0) {
        this.$toast("删除成功！");
        this.cartList = this.cartList.filter(
          (item) => item.product_id != product_id
        );
      } else {
        this.$toast("删除失败！");
      }
    },
  },
  created() {
    this.getCartList();
  },
  computed: {
    totalCount() {
      return this.cartList.reduce((pre, currItem) => {
        return currItem.checked ? (pre += currItem.count) : pre;
      }, 0);
    },
    totalPrice() {
      return (
        this.cartList.reduce((pre, currItem) => {
          return currItem.checked
            ? (pre += currItem.count * currItem.price)
            : pre;
        }, 0) * 100
      );
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 3px 10px;
  box-sizing: border-box;

  .cart-item {
    display: flex;
    width: 100%;
    height: 112px;
    box-shadow: 0 0 2px 1px #eee;
    border-radius: 2px;
    padding-left: 3px;
    margin-top: 2px;
    position: relative;
    margin-bottom: 5px;

    .van-checkbox {
      min-width: 20px;
    }
    .van-card {
      flex-grow: 1;
      background: none;
      margin-top: 0;

      .van-card__content span {
        color: #f50;
        font-size: 12px;
        line-height: 20px;

        &.price {
          font-size: 16px;
        }
      }
      .van-card__footer {
        position: absolute;
        right: 20px;
        bottom: 10px;

        & > .van-button {
          float: left;
          margin-left: 0;
          margin-top: 1px;
        }
      }
    }
  }
  .custom-image.van-empty {
    width: 100vw;
    height: calc(100% + 5px);
    background: rgb(244, 244, 244);
    margin: -3px -10px;
  }
}
</style>