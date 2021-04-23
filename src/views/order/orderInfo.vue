<template>
  <div class="order-info">
      <van-nav-bar
        title="确认订单"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        class="b-border"
       />
        <van-steps :active="active">
            <van-step>未付款</van-step>
            <van-step>已付款</van-step>
            <van-step>已发货</van-step>
            <van-step>交易完成</van-step>
        </van-steps>
        <div class="select-address">
            <van-cell
            :title="`${address.name},${address.tel}`"
            :label="address.address" 
            to="/addressList" 
            />
        </div>
       <main class="container">
          <van-cell-group>
            <van-cell
              v-for="item in productList"
              :key="item.product_id"
              :icon="item.cover"
              :label="'￥' + item.price" 
              :title="item.name"
              :value="item.count + '件'"
            />
          </van-cell-group>
      </main>
      <van-cell class="t-border">
          <template #title>
              合计：<i class="price">{{ totalPrice | formatPrice }}</i>
          </template>
          <template #default>
              <van-button type="primary" @click="onSubmit" :disabled="isAlreadyPay">
                  {{ isAlreadyPay ? "待发货" : '付款'}}
              </van-button>
          </template>
      </van-cell>
      <user-pay :show="show" @changeShow="changeShow" />
  </div>
</template>

<script>
import { reqOrder } from 'network/api'
import userPay from "components/userPay"

export default {
    data() {
        return {
            address: {},
            productList: [],
            active: 0,
            orderInfo: {},
            show: false
        }
    },
    components: {
        userPay
    },
    methods: {
        async getOrderInfo() {
            const { data } = await reqOrder({id: this.$route.query.orderId});
            this.productList = data.orderProducts;
            const { name, mobile: tel, province, city, country, detail } = data.userAddress;
            this.address = {
                name, tel,
                address: `${province} ${city} ${country} ${detail}`
            }
            this.active = data.order_status;
        },
        onSubmit() {
            this.show = !this.show;
        },
        changeShow(show) {
            this.show = !show;
        }
    },
    created() {
        this.getOrderInfo();
    },
    computed: {
        totalPrice() {
            return this.productList.reduce((prePrice, currItem) => {
                return prePrice + currItem.price;
            }, 0)
        },
        isAlreadyPay() {
            return !!(this.active != 0);
        }
    }
}
</script>

<style lang="less" scoped>
.order-info {
    .select-address {
        padding: 10px 0;
        background: rgb(244, 244, 244);
    }
    .container {
        margin-top: 0;
        height: calc(100vh - 238px);

        .van-icon__image {
            width: 50px;
            height: 50px;
            box-shadow: 0 0 3px rgb(190, 190, 190);
        }
    }
}
.order-info /deep/ .t-border.van-cell {
    height: 50px;
    .van-cell__value {
        overflow: initial;
    }
    .van-button {
        position: absolute;
        right: 0;
        top: -5px;
        height: 40px;
    }
}
.order-info /deep/ .price {
    color: #f50;
    font-size: 16px;
}
</style>