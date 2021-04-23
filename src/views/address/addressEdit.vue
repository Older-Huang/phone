<template>
  <div class="address-list">
      <van-nav-bar
        :title="isEdit ? '保存地址' : '新增地址'"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        class="b-border"
       />
       <van-address-edit
        :area-list="areaList"
        show-set-default
        show-search-result
        :show-delete="fromId != 0"
        :address-info="addressInfo"
        @save="onSave"
        @delete="addressDelete"
      />
  </div>
</template>

<script>
import { createUserAddr, deleteUserAddr, updateUserAddr } from "network/api"
import { areaList } from '@vant/area-data';
export default {
  data() {
      return {
        areaList,
        fromId: this.$route.query.id || 0,
        addressInfo: {}
      }
    },
    methods: {
      async onSave(content) {
        let { name, province, city, county: country, addressDetail: detail, tel: mobile, areaCode: code, isDefault: defaults } = content;
        let saveAddressInfo = { name, province, city, country, detail, mobile, code, default: defaults ? 1 : 0};
        if(!this.isEdit) {
          const res = await createUserAddr(saveAddressInfo);
          if(res.errcode != 0) return this.$toast("添加地址失败！");
          this.$store.commit('changeAddresList', {type: 'add', data: res.data});
        }else {
          const res = await updateUserAddr({id:{id: this.fromId}, data: saveAddressInfo});
          if(res.errcode != 0) return this.$toast("修改地址失败！");
          saveAddressInfo.id = this.fromId;
          this.$store.commit('changeAddresList', {type: 'edit', data: saveAddressInfo});
        }
        this.$router.back();
      },
      getInitAddressInfo() {
        if(this.fromId == 0) return;
        const item = this.$store.state.userInfo.addressList.find(item => item.id == this.fromId);
        let { id, name, mobile: tel, province, city, country: county, detail: addressDetail, default: defaults, code: areaCode } = item;
        const isDefault = defaults == 1 ? true : false;
        this.addressInfo = { id, name, tel, province, city, county, addressDetail, isDefault, areaCode };
      },
      async addressDelete() {
        const { errcode } = await deleteUserAddr({id: this.fromId});
        if(errcode != 0) return this.$toast("删除失败！");
        this.$store.commit("changeAddresList", {type: 'del', data: this.fromId});
        this.$router.back();
      }
    },
  created() {
    this.getInitAddressInfo();
  },
  computed: {
    isEdit() {
      return this.$route.query.id != 0;
    }
  }
}
</script>