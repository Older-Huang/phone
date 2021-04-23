<template>
  <div class="login">
      <van-nav-bar
        title="登录/注册"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        class="b-border"
       />
       <van-form @submit="onSubmit">
        <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ validator: usernameVali, required: true, message: '请填写六位数及以上的用户名' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ validator: passwordVali, required: true, message: '请填写六位数及以上的密码' }]"
        />
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">登录/注册</van-button>
        </div>
       </van-form>
  </div>
</template>

<script>
import { userLogin } from 'network/api'
import locStorage from 'utils/storage/locStorage'

export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        async onSubmit() {
            const { data } = await userLogin({name: this.username, password: this.password});
            this.$store.commit('changeUserInfo', data);
            locStorage.set('token', data.token);
            this.$router.back();
        },
        usernameVali(value) {
            return /[a-zA-Z0-9_\u4e00-\u9fa5]{5,}/.test(value);
        },
        passwordVali(value) {
            return /\w{6,}/.test(value);
        }
    }
}
</script>
