<template>
  <div class="pay">
    <van-popup v-model="show" position="bottom"
     :style="{ height: '70%' }"
     :close-on-click-overlay="false"
    >
      <van-nav-bar title="付款" left-arrow @click-left="changeShow">
        <template #left>
          <van-icon name="cross" />
        </template>
      </van-nav-bar>
      <!-- 密码输入框 -->
      <van-password-input
        :value="value"
        info="密码为 6 位数字"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        v-model="value"
        :show="showKeyboard"
      />
    </van-popup>
  </div>
</template>

<script>
import { payOrder } from 'network/api'

export default {
  props: {
      show: {
        type: Boolean,
        default: false
      },
      orderId: {
        type: Number,
      }
  },
  data() {
    return {
      value: "",
      showKeyboard: true,
      payPassword: this.$store.state.userInfo.pay_password || '123456'
    };
  },
  watch: {
    value(value) {
      if (value.length === 6 && value === this.payPassword) {
        this.userPay();
      } else if(value.length === 6 && value !== this.payPassword){
        this.$toast("密码错误，请重试！");
        this.value = '';
      }
    },
  },
  methods: {
      changeShow() {
          this.$emit('changeShow', this.show);
          if(this.orderId) {
            this.$router.push({path: '/orderInfo', query: { orderId: this.orderId}});
          }
      },
      async userPay() {
        const { errcode } = await payOrder({id: {order_id: this.$route.query.orderId || this.orderId}, password: {pay_password: this.value}});
        if(errcode != 0) return this.$toast("支付失败！");
        this.changeShow();
        this.$router.push('/paySuccess');
      }
  }
};
</script>
