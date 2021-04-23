<template>
  <div class="set-avatar">
      <van-nav-bar
        title="设置头像"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        class="b-border"
       />
       <main class="cintainer">
           <div class="img">
               <img :src="imgSrc" alt="" ref="img">
           </div>
            <input type="file" ref="file" @change="setPicture">
       </main>
       <van-button type="info" size="large" @click="selectPicture">选择图片</van-button>
       <van-button type="primary" size="large" @click="upLoadPicture">上传图片</van-button>
  </div>
</template>

<script>
import { upLoadUserAvatar } from 'network/api'
export default {
    data() {
        return {
            imgBase: 'http://192.168.0.129:8360'
        }
    },
    methods: {
        selectPicture() {
            this.$refs.file.click();
        },
        async upLoadPicture() {
            let file = this.$refs.file.files[0];
            let transformData = new FormData();
            transformData.append('avatar', file);
            const { errcode, data } = await upLoadUserAvatar(transformData);
            if(errcode != 0) return $toast("上传头像失败！");
            this.$store.commit('changeUserBasicInfo', {name: 'avatar', value: data.avatar});
            this.$toast("设置头像成功！");
        },
        setPicture() {
            let file = this.$refs.file;
            const ready = new FileReader();
            ready.readAsDataURL(file.files[0]);
            ready.onload = () => {
                this.$refs.img.src = ready.result;
            }
        }
    },
    computed: {
        imgSrc() {
            const { userInfo } = this.$store.state;
            return userInfo.avatar ? this.imgBase + userInfo.avatar : require("assets/imgs/profile.png");
        }
    }
}
</script>

<style lang="less" scoped>
.set-avatar {
    .cintainer {
        height: calc(100vh - 146px);
        background: rgb(237, 237, 237);
        position: relative;

        .img {
            width: 100px;
            height: 100px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 3px rgb(167, 167, 167);
            border-radius: 50%;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }
        input {
            display: none;
        }
    }
}
</style>