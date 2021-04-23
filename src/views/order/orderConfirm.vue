<template>
  <div class="order-confirm">
      <van-nav-bar
        title="确认订单"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        class="b-border"
       />
        <div class="select-address">
            <van-cell
            :title="address.name ? `${address.name},${address.tel}` : '请选择收货地址'"
            :label="address.address || ''" 
            is-link 
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
              :title="item.name | formatTitle"
              :value="item.count + '件'"
            />
          </van-cell-group>
      </main>
      <van-submit-bar
        class="t-border"
        :price="totalPrice"
        button-text="付款"
        @submit="onSubmit"
        >
        <template #default>
            <span class="total">共计:{{ totalCount }}件</span>
        </template>
       </van-submit-bar>
       <user-pay :show="show" :order-id="orderId" @changeShow="changeShow" />
  </div>
</template>

<script>
import locStorage from 'utils/storage/locStorage'
import userPay from 'components/userPay'
import { createOrder } from 'network/api'

export default {
    data() {
        return {
            productList: locStorage.get('orderConfirmList') || [],
            show: false,
            orderId: null
        }
    },
    components: {
        userPay
    },
    methods: {
        async onSubmit() {
            if(!this.address.name) return this.$toast('请选择收货地址！');
            this.show = true;
            let orderProductList = [];
            this.productList.forEach(item => {
                let { product_id, name, price, cover, count } = item;
                orderProductList.push({product_id, name, price, cover, count});
            });
            const { data } = await createOrder({orderProductList, user_address_id: this.address.id});
            this.orderId = data.id;
        },
        changeShow(show) {
            this.show = !show;
        }
    },
    computed: {
        totalCount() {
            return this.productList.reduce((pre, currItem) =>  pre += currItem.count, 0);
        },
        totalPrice() {
            return this.productList.reduce((pre, currItem) =>  pre += currItem.count * currItem.price, 0) * 100;
        },
        address() {
            return locStorage.get("selectAddress") || {};
        }
    }
}
</script>

<style lang="less" scoped>
.order-confirm {
    .select-address {
        padding: 10px 0;
        background: rgb(244, 244, 244);
    }

    .container {
        margin-top: 0;
        height: calc(100vh - 182px);
    
        [class*=van-hairline]::after {
            border: none
        }
        .van-icon__image {
            width: 50px;
            height: 50px;
        }
    }
}

</style>