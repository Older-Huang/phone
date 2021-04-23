<template>
  <div class="set-loginpassword">
      <van-nav-bar
        title="修改登录密码"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        class="b-border"
       />
       <van-form @submit="onSubmit">
        <van-field
          v-model="oldPassword"
          type="password"
          name="旧密码"
          label="旧密码"
          placeholder="请填写旧密码"
          :rules="[{ required: true, message: '请填写旧密码！' }]"
        />
        <van-field
          v-model="newPassword"
          type="password"
          name="新密码"
          label="新密码"
          placeholder="请填写新密码"
          :rules="[{ validator, required: true, message: '请填写六位数及以上的新密码！' }]"
        />
        <div>
          <van-button size="large" type="primary" native-type="submit">确认修改</van-button>
        </div>
      </van-form>
  </div>
</template>

<script>
import { updataUserPassword } from "network/api"
export default {
  data() {
    return {
      oldPassword: '',
      newPassword: ''
    }
  },
  methods: {
    async onSubmit() {
      if(this.oldPassword != this.$store.state.userInfo.password) return this.$toast("旧密码错误！请重输");
      const { errcode } = await updataUserPassword({password: this.oldPassword, newPassword: this.newPassword});
      if(errcode != 0) return this.$toast("旧密码验证错误！");
      this.$store.commit('changeUserInfo', {});
      sessionStorage.removeItem('token');
      this.$router.replace('/login');
    },
    validator(val, rule) {
      if(val == this.oldPassword) {
        rule.message = "新密码不能与旧密码相同！"
        return false;
      }
      if(!/\w{6,}/.test(val)) {
        rule.message = "密码必须是六位数及以上的字母或数字！"
        return false;
      }
    }
  }
}
</script>
