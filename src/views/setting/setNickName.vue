<template>
  <div class="set-nickname">
      <van-nav-bar
        title="修改昵称"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        class="b-border"
       />
       <van-field v-model="text" label="昵称" />
       <van-button type="primary" block @click="setNickName">确认修改</van-button>
  </div>
</template>

<script>
import { setUserNickName } from "network/api"
export default {
    data() {
        return {
            text: this.$store.state.userInfo.nickname
        }
    },
    methods: {
        async setNickName() {
            if(this.text == this.$store.state.userInfo.nickname) return this.$router.back();
            const res = await setUserNickName({nickname: this.text});
            if(res.errcode != 0) return this.$toast('修改昵称失败！');
            this.$store.commit('changeUserBasicInfo', {name: 'nickname', value: res.data.nickname});
            this.$router.back();
        }
    }
}
</script>