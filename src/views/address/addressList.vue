<template>
  <div class="address-list">
      <van-nav-bar
        :title="isFromUser ? '我的收货地址' : '请选择收货地址'"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        class="b-border"
        fixed
       />
       <main class="container">
           <van-address-list
            v-model="chosenAddressId"
            :list="addressList"
            default-tag-text="默认"
            :switchable="!isFromUser"
            @edit="onEdit"
            @select="selectAddress"
            @add="addAddress"
           />
       </main>
  </div>
</template>

<script>
import locStorage from 'utils/storage/locStorage';
export default {
    data() {
      return {
            chosenAddressId: 88
        };
    },
    methods: {
        onEdit(item) {
            const { id } = item;
            this.$router.push({path: '/addressEdit', query: {id}});
        },
        addAddress() {
            this.$router.push({path: '/addressEdit', query: {id: 0}});
        },
        selectAddress(item) {
            locStorage.set('selectAddress', item);
            this.$router.back();
        }
    },
    computed: {
        isFromUser() {
            return !!(this.$route.query.from == "user");
        },
        addressList() {
            const { addressList } = this.$store.state.userInfo;
            if(!addressList) return;
            let addrList = [];
            addressList.forEach(item => {
                let { id, name, mobile: tel, default: isDefault, province, city, country, detail } = item;
                const address = `${province} ${city} ${country} ${detail}`
                isDefault = isDefault == 1 ? true : false;
                addrList.push({id, name, tel, address, isDefault });
            });
            return addrList;
        },
    }
}
</script>